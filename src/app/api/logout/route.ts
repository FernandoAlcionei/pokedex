import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  // I'm mocking this API because we don't have a logout API (would need an API to invalidate the token)
  cookies().delete('authorization')
  return NextResponse.json({})
}