import { Pokemon } from "@/types/pokemon.types";

type Response = {
  count: number;
  results: Pokemon[];
}

export type PokemonListFilter = {
  limit: number;
  offset: number;
  search: string;
  favorites: boolean;
}

const getPokemonInfo = (url: string, favorites: number[]) => (
  fetch(url)
    .then((response) => response.json())
    .then((response) => ({
      id: response.id,
      name: response.name,
      types: response.types.map((item: any) => item.type.name),
      image: response.sprites.other.dream_world.front_default || response.sprites.other.home.front_default || '/images/pokeball.png',
      // Since the API doesn't have a "favorite" attribute I had to mock it
      favorite: favorites.some((pokemon) => pokemon === response.name)
    }))
)

// I had to mock this Search functionality because pokeapi has no parameter to filter pokemons by name
const handleSearchApi = async (filter: PokemonListFilter) => {
  const regexSearch = new RegExp(filter.search, 'i')
  const response = await fetch(`${process.env.POKEAPI_URL}?limit=2000&offset=0`).then((response) => response.json())

  const resultsFiltered = response.results.filter((result: any) => regexSearch.test(result.name));
  const resultsPagination = resultsFiltered.slice(filter.offset, (filter.limit + filter.offset));
  
  return ({
    count: resultsFiltered.length,
    results: resultsPagination
  });
}

// I had to mock this Favorites functionality because pokeapi has no parameter to filter the favorites
const handleFavoritesApi = async (filter: PokemonListFilter, favorites: number[]) => {
  const regexSearch = new RegExp(filter.search, 'i')
  const response = await fetch(`${process.env.POKEAPI_URL}?limit=2000&offset=0`).then((response) => response.json())

  const resultsFiltered = response.results
      .filter((result: any) => {
        const isFavorite = favorites.some((pokemon) => pokemon == result.name);
        if (filter.search) {
          return isFavorite && regexSearch.test(result.name);
        }

        return isFavorite;
      });

  const resultsPagination = resultsFiltered.slice(filter.offset, (filter.limit + filter.offset));
  
  return ({
    count: resultsFiltered.length,
    results: resultsPagination
  });
}

export const list = (filter: PokemonListFilter, favorites: number[]): Promise<Response> => (
  new Promise(async (resolve, reject) => {
    try {
      const pokemonsPromises: Promise<Pokemon>[] = [];
      let response;

      if (filter.favorites) {
        // I had to mock this Favorites functionality because pokeapi has no parameter to filter pokemons
        response = await handleFavoritesApi(filter, favorites);
      } else if (filter.search) {
        // I had to mock this Search functionality because pokeapi has no parameter to filter pokemons by name
        response = await handleSearchApi(filter);
      } else {
        response = await fetch(`${process.env.POKEAPI_URL}?limit=${filter.limit}&offset=${filter.offset}`).then((response) => response.json())
      }

      // I also had to interact with the pokemon list and get their details because the list API only returns the pokemon name
      response.results.forEach((result: { url: string }) => {
        pokemonsPromises.push(getPokemonInfo(result.url, favorites));
      })

      Promise.all(pokemonsPromises).then((results) => {
        resolve({
          count: response.count,
          results,
        });
      })
    } catch (e) {
      reject(e)
    }
  })
)