import { UseMutationResult, useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api";

export const useLogout = (): UseMutationResult => (
	useMutation({
		mutationFn: async () => {
			const { data } = await apiClient.post('/api/logout');
			return data;
		}
	})
);