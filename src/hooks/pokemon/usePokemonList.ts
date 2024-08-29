import apiClient from "@/lib/api";
import { PokemonFilter, PokemonList } from "@/types/pokemon.types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const usePokemonList = (filter: PokemonFilter): UseQueryResult<PokemonList> => (
	useQuery<PokemonList>({
		queryKey: ["pokemonList"],
		queryFn: async () => {
			const offset = (filter.page * filter.pageSize) - filter.pageSize;
			const { data } = await apiClient.get<PokemonList>(`/api/pokemon`, {
				params: {
					limit: filter.pageSize,
					offset,
					search: filter.search,
					favorites: filter.favorites
				}
			});
			return data;
		},
		refetchOnWindowFocus: false
	})
);
