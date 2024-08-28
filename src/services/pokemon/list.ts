import { Pokemon } from "@/types/pokemon.types";

type Response = {
  count: number;
  results: Pokemon[];
}

export type PokemonListFilter = {
  limit: number;
  offset: number;
  search: string;
}

const getPokemonInfo = (url: string) => (
  fetch(url)
    .then((response) => response.json())
    .then((response) => ({
      id: response.id,
      name: response.name,
      types: response.types.map((item: any) => item.type.name),
      image: response.sprites.other.dream_world.front_default || response.sprites.other.home.front_default || '/images/pokeball.png',
      favorite: false
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

export const list = (filter: PokemonListFilter): Promise<Response> => (
  new Promise(async (resolve, reject) => {
    try {
      const pokemonsPromises: Promise<Pokemon>[] = [];
      let response;

      if (filter.search) {
        // I had to mock this Search functionality because pokeapi has no parameter to filter pokemons by name
        response = await handleSearchApi(filter);
      } else {
        response = await fetch(`${process.env.POKEAPI_URL}?limit=${filter.limit}&offset=${filter.offset}`).then((response) => response.json())
      }

      // I also had to interact with the pokemon list and get their details because the list API only returns the pokemon name
      response.results.forEach((result: { url: string }) => {
        pokemonsPromises.push(getPokemonInfo(result.url));
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