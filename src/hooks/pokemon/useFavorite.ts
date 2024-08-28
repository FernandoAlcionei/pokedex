import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "@/lib/api";
import { FavoritePayload, FavoriteResponse } from "@/types/pokemon.types";

export const useFavorite = (): UseMutationResult<FavoriteResponse, AxiosError, FavoritePayload> => (
	useMutation({
		mutationFn: async (payload: FavoritePayload) => {
			const { data } = await apiClient.post<FavoriteResponse>('/api/pokemon/favorite', payload);
			return data;
		}
	})
);