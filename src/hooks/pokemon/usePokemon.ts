import apiClient from "@/lib/api";
import { Pokemon } from "@/types/pokemon.types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const usePokemon = (name: string): UseQueryResult<Pokemon> => (
	useQuery<Pokemon>({
		queryKey: [`pokemon-${name}`],
		queryFn: async () => {
			const { data } = await apiClient.get<Pokemon>(`/api/pokemon/${name}`);
			return data;
		},
		refetchOnWindowFocus: false
	})
);
