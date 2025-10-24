import { NextRequest, NextResponse } from 'next/server'
import { buildExternalUrl, ExternalApiEndpoints } from '@/lib/external-api'

export async function GET(_request: NextRequest) {
  try {
    const url = buildExternalUrl(ExternalApiEndpoints.zones)
    const upstream = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    })
    if (!upstream.ok) {
      return NextResponse.json({ error: 'Failed to fetch zones' }, { status: upstream.status })
    }
    const data = await upstream.json()
    return NextResponse.json({ list: Array.isArray(data?.listObject) ? data.listObject : [] })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}

