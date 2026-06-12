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
    gcTime: 1000 * 60 * 10,
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

export const useCreateCatalogSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => stickersApi.addSticker(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });
};

export const useUpdateCatalogSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ number, data }) => stickersApi.updateSticker(number, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["album"] });
    },
  });
};

export const useDeleteCatalogSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (number) => stickersApi.deleteSticker(number),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["album"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
};

// Optimistic Mutations

export const useAddSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addStickerToCollect(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["album", newData.email] });

      const previousAlbum = queryClient.getQueryData(["album", newData.email]);

      if (previousAlbum) {
        queryClient.setQueryData(
          ["album", newData.email],
          previousAlbum.map((sticker) =>
            sticker.number === newData.number
              ? { ...sticker, amount: newData.amount, autograph: newData.autograph ?? false }
              : sticker,
          ),
        );
      }
      return { previousAlbum };
    },
    onError: (err, newData, context) => {
      if (context?.previousAlbum) {
        queryClient.setQueryData(
          ["album", newData.email],
          context.previousAlbum,
        );
      }
      alert(
        `Erro ao adicionar figurinha: ${err.message || "Tente novamente."}`,
      );
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["album", variables.email] });
      queryClient.invalidateQueries({ queryKey: ["stats", variables.email] });
    },
  });
};

export const useUpdateSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateStickerInCollect(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["album", newData.email] });
      const previousAlbum = queryClient.getQueryData(["album", newData.email]);

      if (previousAlbum) {
        queryClient.setQueryData(
          ["album", newData.email],
          previousAlbum.map((sticker) =>
            sticker.number === newData.number
              ? { ...sticker, amount: newData.amount, autograph: newData.autograph ?? false }
              : sticker,
          ),
        );
      }
      return { previousAlbum };
    },
    onError: (err, newData, context) => {
      if (context?.previousAlbum) {
        queryClient.setQueryData(
          ["album", newData.email],
          context.previousAlbum,
        );
      }
      alert(
        `Erro ao atualizar quantidade: ${err.message || "Tente novamente."}`,
      );
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["album", variables.email] });
      queryClient.invalidateQueries({ queryKey: ["stats", variables.email] });
    },
  });
};

export const useDeleteSticker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, number }) => deleteStickerFromCollect(email, number),
    onMutate: async ({ email, number }) => {
      await queryClient.cancelQueries({ queryKey: ["album", email] });
      const previousAlbum = queryClient.getQueryData(["album", email]);

      if (previousAlbum) {
        queryClient.setQueryData(
          ["album", email],
          previousAlbum.map((sticker) =>
            sticker.number === number ? { ...sticker, amount: 0, autograph: false } : sticker,
          ),
        );
      }
      return { previousAlbum };
    },
    onError: (err, variables, context) => {
      if (context?.previousAlbum) {
        queryClient.setQueryData(
          ["album", variables.email],
          context.previousAlbum,
        );
      }
      alert(`Erro ao remover figurinha: ${err.message || "Tente novamente."}`);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["album", variables.email] });
      queryClient.invalidateQueries({ queryKey: ["stats", variables.email] });
    },
  });
};
