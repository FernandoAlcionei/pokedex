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
  }

  const pokemons = await pokemon.list(filter);

  // Since the API doesn't have a "favorite" attribute I had to use cookies to mock it
  const cookieValue = cookies().get('favorites')?.value;
  const favorites: number[] = cookieValue ? JSON.parse(cookieValue) : [];
  pokemons.results.forEach((item) => {
    item.favorite = favorites.some((pokemonId) => pokemonId === item.id);
  })

  return NextResponse.json(pokemons)
}