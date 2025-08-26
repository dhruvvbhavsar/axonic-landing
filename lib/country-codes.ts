export type CountryDialCode = {
  name: string
  code: string // ISO 3166-1 alpha-2
  dialCode: string // E.164 dialing code (e.g., "+1")
}

// Common countries and broad coverage; extend as needed
export const COUNTRY_CODES: CountryDialCode[] = [
  { name: "United States", code: "US", dialCode: "+1" },
  { name: "Canada", code: "CA", dialCode: "+1" },
  { name: "United Kingdom", code: "GB", dialCode: "+44" },
  { name: "India", code: "IN", dialCode: "+91" },
  { name: "Australia", code: "AU", dialCode: "+61" },
  { name: "New Zealand", code: "NZ", dialCode: "+64" },
  { name: "Singapore", code: "SG", dialCode: "+65" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966" },
  { name: "Qatar", code: "QA", dialCode: "+974" },
  { name: "Kuwait", code: "KW", dialCode: "+965" },
  { name: "Oman", code: "OM", dialCode: "+968" },
  { name: "Bahrain", code: "BH", dialCode: "+973" },
  { name: "Japan", code: "JP", dialCode: "+81" },
  { name: "South Korea", code: "KR", dialCode: "+82" },
  { name: "China", code: "CN", dialCode: "+86" },
  { name: "Hong Kong", code: "HK", dialCode: "+852" },
  { name: "Taiwan", code: "TW", dialCode: "+886" },
  { name: "Indonesia", code: "ID", dialCode: "+62" },
  { name: "Malaysia", code: "MY", dialCode: "+60" },
  { name: "Thailand", code: "TH", dialCode: "+66" },
  { name: "Philippines", code: "PH", dialCode: "+63" },
  { name: "Vietnam", code: "VN", dialCode: "+84" },
  { name: "Pakistan", code: "PK", dialCode: "+92" },
  { name: "Bangladesh", code: "BD", dialCode: "+880" },
  { name: "Sri Lanka", code: "LK", dialCode: "+94" },
  { name: "Nepal", code: "NP", dialCode: "+977" },
  { name: "Myanmar", code: "MM", dialCode: "+95" },
  { name: "Cambodia", code: "KH", dialCode: "+855" },
  { name: "Laos", code: "LA", dialCode: "+856" },
  { name: "Turkey", code: "TR", dialCode: "+90" },
  { name: "Israel", code: "IL", dialCode: "+972" },
  { name: "Egypt", code: "EG", dialCode: "+20" },
  { name: "South Africa", code: "ZA", dialCode: "+27" },
  { name: "Kenya", code: "KE", dialCode: "+254" },
  { name: "Nigeria", code: "NG", dialCode: "+234" },
  { name: "Ghana", code: "GH", dialCode: "+233" },
  { name: "Ethiopia", code: "ET", dialCode: "+251" },
  { name: "Morocco", code: "MA", dialCode: "+212" },
  { name: "Tunisia", code: "TN", dialCode: "+216" },
  { name: "France", code: "FR", dialCode: "+33" },
  { name: "Germany", code: "DE", dialCode: "+49" },
  { name: "Spain", code: "ES", dialCode: "+34" },
  { name: "Italy", code: "IT", dialCode: "+39" },
  { name: "Portugal", code: "PT", dialCode: "+351" },
  { name: "Netherlands", code: "NL", dialCode: "+31" },
  { name: "Belgium", code: "BE", dialCode: "+32" },
  { name: "Switzerland", code: "CH", dialCode: "+41" },
  { name: "Austria", code: "AT", dialCode: "+43" },
  { name: "Sweden", code: "SE", dialCode: "+46" },
  { name: "Norway", code: "NO", dialCode: "+47" },
  { name: "Denmark", code: "DK", dialCode: "+45" },
  { name: "Finland", code: "FI", dialCode: "+358" },
  { name: "Ireland", code: "IE", dialCode: "+353" },
  { name: "Poland", code: "PL", dialCode: "+48" },
  { name: "Czechia", code: "CZ", dialCode: "+420" },
  { name: "Slovakia", code: "SK", dialCode: "+421" },
  { name: "Hungary", code: "HU", dialCode: "+36" },
  { name: "Romania", code: "RO", dialCode: "+40" },
  { name: "Bulgaria", code: "BG", dialCode: "+359" },
  { name: "Greece", code: "GR", dialCode: "+30" },
  { name: "Croatia", code: "HR", dialCode: "+385" },
  { name: "Slovenia", code: "SI", dialCode: "+386" },
  { name: "Lithuania", code: "LT", dialCode: "+370" },
  { name: "Latvia", code: "LV", dialCode: "+371" },
  { name: "Estonia", code: "EE", dialCode: "+372" },
  { name: "Russia", code: "RU", dialCode: "+7" },
  { name: "Ukraine", code: "UA", dialCode: "+380" },
  { name: "Belarus", code: "BY", dialCode: "+375" },
  { name: "Kazakhstan", code: "KZ", dialCode: "+7" },
  { name: "Uzbekistan", code: "UZ", dialCode: "+998" },
  { name: "Azerbaijan", code: "AZ", dialCode: "+994" },
  { name: "Georgia", code: "GE", dialCode: "+995" },
  { name: "Armenia", code: "AM", dialCode: "+374" },
  { name: "Brazil", code: "BR", dialCode: "+55" },
  { name: "Argentina", code: "AR", dialCode: "+54" },
  { name: "Chile", code: "CL", dialCode: "+56" },
  { name: "Colombia", code: "CO", dialCode: "+57" },
  { name: "Peru", code: "PE", dialCode: "+51" },
  { name: "Venezuela", code: "VE", dialCode: "+58" },
  { name: "Mexico", code: "MX", dialCode: "+52" },
  { name: "Costa Rica", code: "CR", dialCode: "+506" },
  { name: "Panama", code: "PA", dialCode: "+507" },
]

export function findDialCodeByIso2(iso2: string | undefined | null): string | undefined {
  if (!iso2) return undefined
  const upper = iso2.toUpperCase()
  return COUNTRY_CODES.find(c => c.code === upper)?.dialCode
}

export function iso2ToFlagEmoji(iso2: string | undefined | null): string {
  if (!iso2) return ""
  try {
    const upper = iso2.toUpperCase()
    const codePoints = [...upper].map(char => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  } catch {
    return ""
  }
}


