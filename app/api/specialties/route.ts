import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  try {
    const upstream = await fetch('https://axonmd.axonichealth.co.in/api/v01/getSpecilityList', {
      method: 'GET',
      // Prevent Next from caching this external request
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    })
    if (!upstream.ok) {
      return NextResponse.json({ error: 'Failed to fetch specialties' }, { status: upstream.status })
    }
    const data = await upstream.json()
    return NextResponse.json({ list: Array.isArray(data?.listObject) ? data.listObject : [] })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}



