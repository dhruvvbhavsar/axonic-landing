"use client"
import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { COUNTRY_CODES } from '@/lib/country-codes'
import { useExternalApiHeader } from '@/components/external-api-switcher'

function formatDdMmYyyy(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}

function addMonths(d: Date, months: number): Date {
  const nd = new Date(d)
  nd.setMonth(nd.getMonth() + months)
  return nd
}

function addYears(d: Date, years: number): Date {
  const nd = new Date(d)
  nd.setFullYear(nd.getFullYear() + years)
  return nd
}

function addDaysDate(d: Date, days: number): Date {
  const nd = new Date(d)
  nd.setDate(nd.getDate() + days)
  return nd
}

type Props = { doctorPartialRegId: string }

export default function ResumeForm({ doctorPartialRegId }: Props) {
  const apiHeader = useExternalApiHeader()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)
  const submittingRef = React.useRef(false)
  const [specialities, setSpecialities] = React.useState<string[]>([])
  const [countries, setCountries] = React.useState<any[]>([])
  const [states, setStates] = React.useState<any[]>([])
  const [cities, setCities] = React.useState<any[]>([])
  const [zones, setZones] = React.useState<any[]>([])
  const [selectedCountryId, setSelectedCountryId] = React.useState<number | null>(null)
  const [selectedStateId, setSelectedStateId] = React.useState<number | null>(null)
  const [selectedCityId, setSelectedCityId] = React.useState<number | null>(null)
  const [selectedZoneId, setSelectedZoneId] = React.useState<number | null>(null)
  const ipLocationRef = React.useRef<{ country?: string; countryCode?: string; state?: string; city?: string; timezone?: string } | null>(null)
  const [details, setDetails] = React.useState({
    firstName: '',
    lastName: '',
    emailId: '',
    speciality: '',
    gender: '',
    registrationNumber: '',
    countryCode: '+91',
    phone: '',
  })
  const paymentMetaRef = React.useRef<{ plan?: string; billingCycle?: 'monthly' | 'yearly'; region?: string }>({})
  const trialDaysRef = React.useRef<number>(90)

  const validateEmail = (email: string) => {
    const [local] = email.split('@')
    if (local && local.includes('+')) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  React.useEffect(() => {
    let cancelled = false
    async function init() {
      try {
        setLoading(true)
        // Load partial
        const resp = await fetch('/api/external/doctor-partial/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...apiHeader },
          body: JSON.stringify({ doctorPartialRegId: Number(doctorPartialRegId) }),
        })
        const json = await resp.json()
        const obj = json?.object || {}
        if (cancelled) return
        setDetails(d => ({
          ...d,
          firstName: obj.firstName || '',
          lastName: obj.lastName || '',
          emailId: obj.emailId || '',
        }))
        try {
          const pm = JSON.parse(obj.subscriptionPaymentDetails || '{}')
          paymentMetaRef.current = {
            plan: pm?.plan,
            billingCycle: pm?.billingCycle,
            region: pm?.region,
          }
          const td = parseInt(pm?.trial_days || pm?.trialDays || '0', 10)
          if (Number.isFinite(td) && td > 0) trialDaysRef.current = td
        } catch {}

        // Preload lists and IP location
        const [specRes, countriesRes, zonesRes, ipRes, trialsRes] = await Promise.all([
          fetch('/api/specialties', { headers: apiHeader }),
          fetch('/api/address/countries', { headers: apiHeader }),
          fetch('/api/zones', { headers: apiHeader }),
          fetch('https://ipapi.co/json/').catch(() => null),
          fetch(`/api/trials/axonmd?env=${process.env.NEXT_PUBLIC_RUNTIME_ENV || 'dev'}`).catch(() => null),
        ])
        const [specJson, countriesJson, zonesJson, ipJson, trialsJson] = await Promise.all([
          specRes.json().catch(() => ({})),
          countriesRes.json().catch(() => ({})),
          zonesRes.json().catch(() => ({})),
          ipRes ? ipRes.json().catch(() => ({})) : Promise.resolve({}),
          trialsRes ? trialsRes.json().catch(() => ({})) : Promise.resolve({}),
        ])
        if (cancelled) return
        setSpecialities(Array.isArray(specJson?.list) ? specJson.list : [])
        // Default trial days if not set from payment details
        try {
          const tdApi = parseInt(trialsJson?.data?.trialDays || '0', 10)
          if ((!trialDaysRef.current || trialDaysRef.current <= 0) && Number.isFinite(tdApi) && tdApi > 0) {
            trialDaysRef.current = tdApi
          }
        } catch {}
        const countriesList = Array.isArray(countriesJson?.list) ? countriesJson.list : []
        const zonesList = Array.isArray(zonesJson?.list) ? zonesJson.list : []
        setCountries(countriesList)
        setZones(zonesList)

        // Auto-select based on IP
        const ipLoc = {
          country: ipJson?.country_name || ipJson?.country || '',
          countryCode: ipJson?.country_code || '',
          state: ipJson?.region || '',
          city: ipJson?.city || '',
          timezone: ipJson?.timezone || '',
        }
        ipLocationRef.current = ipLoc
        // Country
        const matchedCountry = countriesList.find((c: any) =>
          c.countryCode === ipLoc.countryCode ||
          (c.countryName && ipLoc.country && c.countryName.toLowerCase() === ipLoc.country.toLowerCase())
        )
        if (matchedCountry) {
          setSelectedCountryId(matchedCountry.countryId)
        }
        // Zone
        if (zonesList.length > 0) {
          let matchedZone = null as any
          if (ipLoc.timezone) {
            matchedZone = zonesList.find((z: any) => z.zoneDesc === ipLoc.timezone)
          }
          const zoneToSelect = matchedZone || zonesList[0]
          setSelectedZoneId(zoneToSelect.zoneMasterId)
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load data')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    init()
    return () => { cancelled = true }
  }, [doctorPartialRegId, JSON.stringify(apiHeader)])

  React.useEffect(() => {
    let cancelled = false
    async function loadStates() {
      if (!selectedCountryId) {
        setStates([]); setSelectedStateId(null); setCities([]); setSelectedCityId(null)
        return
      }
      try {
        const res = await fetch(`/api/address/states?countryId=${selectedCountryId}`, { headers: apiHeader })
        const json = await res.json().catch(() => ({}))
        if (!cancelled) {
          const list = Array.isArray(json?.list) ? json.list : []
          setStates(list)
          if (!selectedStateId && ipLocationRef.current && ipLocationRef.current.state) {
            const ipState = ipLocationRef.current.state.toLowerCase()
            const matchedState = list.find((s: any) =>
              s.stateName?.toLowerCase() === ipState ||
              s.stateName?.toLowerCase().includes(ipState) ||
              ipState.includes((s.stateName || '').toLowerCase())
            )
            if (matchedState) setSelectedStateId(matchedState.stateId)
          }
        }
      } catch { if (!cancelled) setStates([]) }
    }
    loadStates()
    return () => { cancelled = true }
  }, [selectedCountryId, JSON.stringify(apiHeader)])

  React.useEffect(() => {
    let cancelled = false
    async function loadCities() {
      if (!selectedStateId) { setCities([]); setSelectedCityId(null); return }
      try {
        const res = await fetch(`/api/address/cities?stateId=${selectedStateId}`, { headers: apiHeader })
        const json = await res.json().catch(() => ({}))
        if (!cancelled) {
          const list = Array.isArray(json?.list) ? json.list : []
          setCities(list)
          if (!selectedCityId && ipLocationRef.current && ipLocationRef.current.city) {
            const ipCity = ipLocationRef.current.city.toLowerCase()
            const matchedCity = list.find((c: any) =>
              c.cityName?.toLowerCase() === ipCity ||
              c.cityName?.toLowerCase().includes(ipCity) ||
              ipCity.includes((c.cityName || '').toLowerCase())
            )
            if (matchedCity) setSelectedCityId(matchedCity.cityId)
          }
        }
      } catch { if (!cancelled) setCities([]) }
    }
    loadCities()
    return () => { cancelled = true }
  }, [selectedStateId, JSON.stringify(apiHeader)])

  const onSubmit = async () => {
    if (submittingRef.current) return
    submittingRef.current = true
    setError(null)
    // Validate required fields
    if (!details.firstName.trim()) { setError('First name is required'); return }
    if (!details.lastName.trim()) { setError('Last name is required'); return }
    if (!details.emailId.trim() || !validateEmail(details.emailId)) { setError('Valid email is required'); return }
    if (!details.gender) { setError('Gender is required'); return }
    if (!details.speciality) { setError('Speciality is required'); return }
    if (!details.registrationNumber.trim()) { setError('Registration number is required'); return }
    if (!details.phone.trim() || details.phone.length < 8 || details.phone.length > 15) { setError('Valid mobile number is required'); return }
    if (!selectedCountryId || !selectedStateId || !selectedCityId || !selectedZoneId) { setError('Country, Zone, State and City are required'); return }

    setSaving(true)
    try {
      const plan = paymentMetaRef.current.plan || ''
      const billingCycle = paymentMetaRef.current.billingCycle || 'monthly'
      const now = new Date()
      const startDate = formatDdMmYyyy(now)
      const endDate = formatDdMmYyyy(addDaysDate(now, (Number.isFinite(trialDaysRef.current) && trialDaysRef.current > 0) ? trialDaysRef.current : 90))

      // External API prechecks (email and registration number)
      try {
        const emailCheckRes = await fetch('/api/external/check-email-exists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...apiHeader },
          body: JSON.stringify({ emailId: details.emailId })
        })
        const emailCheck = await emailCheckRes.json().catch(() => ({}))
        if (Array.isArray(emailCheck?.listObject) && emailCheck.listObject.length > 0) {
          throw new Error('This email address is already registered. Please use a different email or contact support.')
        }

        const regCheckRes = await fetch('/api/external/check-registration-exists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...apiHeader },
          body: JSON.stringify({ registrationNumber: details.registrationNumber })
        })
        const regCheck = await regCheckRes.json().catch(() => ({}))
        if (Array.isArray(regCheck?.listObject) && regCheck.listObject.length > 0) {
          throw new Error('This GMC/Medical Registration Number is already registered. Please verify your registration number or contact support.')
        }
      } catch (preErr: any) {
        setError(preErr?.message || 'Validation failed')
        return
      }

      const payload: any = {
        privateNetwork: true,
        firstName: details.firstName,
        lastName: details.lastName,
        specialty: details.speciality,
        gender: details.gender?.startsWith('M') ? 'M' : details.gender?.startsWith('F') ? 'F' : 'O',
        countryName: '',
        mobileNumber: details.phone,
        registrationNumber: details.registrationNumber,
        emailId: details.emailId,
        classificationName: details.speciality,
        sessionObject: {
          unitId: 4,
          hospitalId: 1,
          channelId: 1,
          roleMasterId: 2,
          bucketName: 'gastrosurgery--uk/',
        },
        subscriptionStartDate: startDate,
        subscriptionEndDate: endDate,
        subscriptionPaymentDetails: JSON.stringify({ plan, billingCycle, region: paymentMetaRef.current.region || '' }),
        unitMasterDto: {
          countryId: selectedCountryId,
          stateId: selectedStateId,
          cityId: selectedCityId,
          zoneId: selectedZoneId,
        },
      }

      const resp = await fetch('/api/external/doctors/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!resp.ok) {
        const j = await resp.json().catch(() => ({}))
        throw new Error(j?.message || 'Failed to save')
      }

      // Wait 2 seconds, then call update to record subscription period/payment details post-save
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const paymentDetails = {
          eventId: undefined,
          sessionId: undefined,
          subscriptionId: undefined,
          customerId: undefined,
          invoiceId: undefined,
          currency: undefined,
          amountSubtotal: 0,
          amountTotal: 0,
          paymentStatus: 'paid',
          mode: 'subscription',
          plan,
          billingCycle,
          region: paymentMetaRef.current.region || '',
          trial_days: (Number.isFinite(trialDaysRef.current) && trialDaysRef.current > 0) ? trialDaysRef.current : 90,
        }
        const updatePayload = {
          emailId: details.emailId,
          subscriptionStartDate: startDate,
          subscriptionEndDate: endDate,
          subscriptionPaymentDetails: JSON.stringify(paymentDetails),
        }
        await fetch('/api/external/doctors/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload),
        }).catch(() => {})
      } catch {
        // Non-blocking
      }
      window.location.href = '/our-products/axonmd/success/'
    } catch (e: any) {
      setError(e?.message || 'Failed to finalize registration')
    } finally {
      setSaving(false)
      submittingRef.current = false
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Resume Registration</h2>
        <p className="text-gray-600 text-sm">Please provide the remaining details to complete your setup.</p>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading…</p>
      ) : (
        <>
          {error && (
            <div className="mb-4 p-3 rounded-md border border-red-200 bg-red-50 text-sm text-red-800">{error}</div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">First name</Label>
              <Input value={details.firstName} disabled className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Last name</Label>
              <Input value={details.lastName} disabled className="mt-1" />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-sm">Email</Label>
              <Input value={details.emailId} disabled className="mt-1" />
            </div>

            <div>
              <Label className="text-sm">Gender</Label>
              <Select value={details.gender} onValueChange={(v) => setDetails(d => ({ ...d, gender: v }))}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm">Speciality</Label>
              <Select value={details.speciality} onValueChange={(v) => setDetails(d => ({ ...d, speciality: v }))}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder={specialities.length === 0 ? 'Loading…' : 'Select speciality'} />
                </SelectTrigger>
                <SelectContent>
                  {specialities.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label className="text-sm">GMC / Medical Registration No.</Label>
              <Input value={details.registrationNumber} onChange={(e) => setDetails(d => ({ ...d, registrationNumber: e.target.value }))} className="mt-1" placeholder="Enter registration number" />
            </div>

            <div>
              <Label className="text-sm">Country</Label>
              <Select value={selectedCountryId?.toString() || ''} onValueChange={(v) => setSelectedCountryId(parseInt(v))}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c: any) => (<SelectItem key={c.countryId} value={c.countryId.toString()}>{c.countryName}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm">Zone</Label>
              <Select value={selectedZoneId?.toString() || ''} onValueChange={(v) => setSelectedZoneId(parseInt(v))}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((z: any) => (<SelectItem key={z.zoneMasterId} value={z.zoneMasterId.toString()}>{z.zoneDesc}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm">State</Label>
              <Select value={selectedStateId?.toString() || ''} onValueChange={(v) => setSelectedStateId(parseInt(v))}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s: any) => (<SelectItem key={s.stateId} value={s.stateId.toString()}>{s.stateName}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm">City</Label>
              <Select value={selectedCityId?.toString() || ''} onValueChange={(v) => setSelectedCityId(parseInt(v))}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c: any) => (<SelectItem key={c.cityId} value={c.cityId.toString()}>{c.cityName}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm">Country code</Label>
              <Select value={details.countryCode} onValueChange={(v) => setDetails(d => ({ ...d, countryCode: v }))}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select code" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CODES.map(cc => (<SelectItem key={cc.code} value={cc.dialCode}>{cc.name} ({cc.dialCode})</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm">Mobile Number</Label>
              <Input value={details.phone} onChange={(e) => setDetails(d => ({ ...d, phone: e.target.value.replace(/\D/g, '') }))} className="mt-1" placeholder="Enter mobile number" />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => { window.location.href = '/our-products/axonmd/' }}>Cancel</Button>
            <Button onClick={onSubmit} disabled={saving} className="bg-blue-500 hover:bg-blue-600 text-white">{saving ? 'Saving…' : 'Submit'}</Button>
          </div>
        </>
      )}
    </div>
  )
}


