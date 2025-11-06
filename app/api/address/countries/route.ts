import { NextRequest, NextResponse } from 'next/server'
import { buildExternalUrlFromRequest, ExternalApiEndpoints } from '@/lib/external-api'

export async function GET(request: NextRequest) {
  try {
    const url = `${buildExternalUrlFromRequest(request, ExternalApiEndpoints.addressData)}?addressId=1&addressKey=`
    const upstream = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    })
    if (!upstream.ok) {
      return NextResponse.json({ error: 'Failed to fetch countries' }, { status: upstream.status })
    }
    const data = await upstream.json()
    return NextResponse.json({ list: Array.isArray(data?.listObject) ? data.listObject : [] })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}

