import apiClient from "@/lib/api";
import { PokemonList } from "@/types/pokemon.types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const usePokemonList = (): UseQueryResult<PokemonList> => (
	useQuery<PokemonList>({
		queryKey: ["pokemonList"],
		queryFn: async () => {
			const { data } = await apiClient.get<PokemonList>(`/api/pokemon?limit=100&offset=1`);
			return data;
		},
		refetchOnWindowFocus: false
	})
);
