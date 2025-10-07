import { NextRequest, NextResponse } from 'next/server'
import { buildExternalUrl, ExternalApiEndpoints } from '@/lib/external-api'

export async function POST(request: NextRequest) {
  try {
    const { emailId } = await request.json()
    if (!emailId || typeof emailId !== 'string') {
      return NextResponse.json({ error: 'emailId is required' }, { status: 400 })
    }
    const url = buildExternalUrl(ExternalApiEndpoints.checkEmail)
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailId })
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


