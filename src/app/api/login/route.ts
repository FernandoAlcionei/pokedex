import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { token } from '@/services';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // I'm mocking this authentication because there is no authentication API
  if (username == 'fernando' && password == 'pokemon') {
    const user = {
      userId: 'user_id_1',
      name: 'Fernando',
      lastname: 'Souza',
    };

    const authorization = token.create(user)
    var expires = new Date();
    expires.setDate(expires.getDate() + 1);

    cookies().set('authorization', authorization, {
      expires,
      sameSite: 'lax',
      path: '/',
    })

    return NextResponse.json({ user })
  }
    
  return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 })
}