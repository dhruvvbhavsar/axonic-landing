import { NextRequest, NextResponse } from 'next/server'
import { buildExternalUrlFromRequest, ExternalApiEndpoints } from '@/lib/external-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stateId = searchParams.get('stateId')
    
    if (!stateId) {
      return NextResponse.json({ error: 'stateId is required' }, { status: 400 })
    }
    
    const url = `${buildExternalUrlFromRequest(request, ExternalApiEndpoints.addressData)}?addressId=${stateId}&addressKey=city`
    const upstream = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    })
    if (!upstream.ok) {
      return NextResponse.json({ error: 'Failed to fetch cities' }, { status: upstream.status })
    }
    const data = await upstream.json()
    return NextResponse.json({ list: Array.isArray(data?.listObject) ? data.listObject : [] })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}

