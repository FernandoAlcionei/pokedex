import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { pokemon } = await req.json();
  
  // I'm mocking favorite pokemons because there is no API to persist them
  const cookieValue = cookies().get('favorites')?.value;
  const favorites: number[] = cookieValue ? JSON.parse(cookieValue) : [];

  const favoriteIndex = favorites.findIndex((item: number) => item == pokemon);

  if (favoriteIndex >= 0) {
    favorites.splice(favoriteIndex, 1);
  } else {
    favorites.push(pokemon);
  }
 
  cookies().set('favorites', JSON.stringify(favorites), {
    expires: new Date().setFullYear(new Date().getFullYear() + 1),
    sameSite: 'lax',
    path: '/',
  })

  return NextResponse.json({ ok: true })
}