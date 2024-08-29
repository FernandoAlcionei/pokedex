import { pokemon } from '@/services';
import { PokemonListFilter } from '@/services/pokemon';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter: PokemonListFilter = {
    limit: Number(searchParams.get('limit')) || 10,
    offset: Number(searchParams.get('offset')),
    search: searchParams.get('search') || '',
    favorites: searchParams.get('favorites') == 'true',
  }

  // Since the API doesn't have a "favorite" attribute I had to use cookies to mock it
  const cookieValue = cookies().get('favorites')?.value;
  const favorites: number[] = cookieValue ? JSON.parse(cookieValue) : [];

  const pokemons = await pokemon.list(filter, favorites);

  return NextResponse.json(pokemons)
}