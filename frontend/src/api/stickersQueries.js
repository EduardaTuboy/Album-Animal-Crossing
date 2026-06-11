import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as stickersApi from "./stickersApi.js";

export const useStats = (email) =>
  useQuery({
    queryKey: ["stats", email],
    queryFn: () => stickersApi.getStats(email),
    enabled: !!email,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10, // Na v5, cacheTime passou a chamar-se gcTime
  });

export const useAlbum = (email) =>
  useQuery({
    queryKey: ["album", email],
    queryFn: () => stickersApi.getAlbum(email),
    enabled: !!email,
    staleTime: 1000 * 60 * 2,
  });

export const useCollection = () =>
  useQuery({
    queryKey: ["collection"],
    queryFn: stickersApi.getCollection,
    staleTime: 1000 * 60 * 2,
  });

export const useAddSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sticker) => stickersApi.addSticker(sticker),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] }); // Também precisa de objeto na v5
    },
  });
};

export const useUpdateSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ number, data }) => stickersApi.updateSticker(number, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });
};

export const useDeleteSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (number) => stickersApi.deleteSticker(number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });
};
