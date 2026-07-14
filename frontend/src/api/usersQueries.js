import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; //
import {
  updateAvatar,
  getUserProfile,
  claimUserCard,
} from "../api/usersApi.js";

export const useUserProfile = (email) => {
  return useQuery({
    queryKey: ["userProfile", email],
    queryFn: () => getUserProfile(email),
    enabled: !!email,
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (avatarData) => updateAvatar(avatarData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile", variables.email],
      });
      alert("Avatar salvo com sucesso!");
    },
    onError: (err) => {
      console.error("Erro detalhado do fetch:", err);
      alert(
        `Não foi possível salvar o avatar: ${err.message || "Erro de rota."}`,
      );
    },
  });
};

export const useClaimCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email) => claimUserCard(email),
    onSuccess: (data, email) => {
      // Invalida o cache e força a atualização das cartas na tela
      queryClient.invalidateQueries({
        queryKey: ["userProfile", email],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats", email],
      });
      queryClient.invalidateQueries({
        queryKey: ["album", email],
      });
    },
    onError: (err) => {
      console.error("Erro ao resgatar carta:", err);
    },
  });
};
