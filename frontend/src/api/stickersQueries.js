import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addStickerToCollect,
  updateStickerInCollect,
  deleteStickerFromCollect,
} from "./stickersApi.js";
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

// E altere as funções de mutação:
export const useAddSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addStickerToCollect(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["album"] });
    },
  });
};

export const useUpdateSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateStickerInCollect(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["album"] });
    },
  });
};

export const useDeleteSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, number }) => deleteStickerFromCollect(email, number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["album"] });
    },
  });
};
