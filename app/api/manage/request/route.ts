import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

function getEnv(name: string, fallback?: string): string {
  const v = process.env[name] || fallback
  if (!v) throw new Error(`Missing env ${name}`)
  return v
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    const secret = new TextEncoder().encode(getEnv('MANAGE_JWT_SECRET', 'dev-secret-change'))
    const issuer = 'axonic-manage'
    const audience = 'manage-portal'
    const expiresIn = '2h'

    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(issuer)
      .setAudience(audience)
      .setExpirationTime(expiresIn)
      .sign(secret)

    const origin = request.headers.get('origin') || 'http://localhost:3000'
    const link = `${origin}/manage?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`

    // Send email using existing SES lambda (same as contact form)
    const emailPayload = {
      to: email,
      from: 'info@axonichealth.com',
      subject: 'Manage your AxonMD subscription',
      data: `<p>Click the secure link below to manage your subscription (valid for 2 hours):</p><p><a href="${link}">${link}</a></p>`
    }

    await fetch('https://ojw0jjra11.execute-api.ap-south-1.amazonaws.com/prod/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload)
    })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}
