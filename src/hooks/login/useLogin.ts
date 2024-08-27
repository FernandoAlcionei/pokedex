import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginPayload, LoginResponse } from "@/types/login.types";
import apiClient from "@/lib/api";

export const useLogin = (): UseMutationResult<LoginResponse, AxiosError, LoginPayload> => (
	useMutation({
		mutationFn: async (payload: LoginPayload) => {
			const { data } = await apiClient.post<LoginResponse>('/api/login', {
				...payload
			});
			return data;
		}
	})
);