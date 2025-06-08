import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./slices/authSlice";
import { StoreApi } from "zustand";
import { ProfileSlice, createProfileSlice } from "./slices/profileStlice";

export interface RootStore extends AuthSlice, ProfileSlice {}

const storeInitializer = (
  set: StoreApi<RootStore>["setState"],
  get: StoreApi<RootStore>["getState"],
  store: StoreApi<RootStore>
): RootStore => ({
  ...createAuthSlice(set, get, store),
  ...createProfileSlice(set, get, store),
});

export const useRootStore = create<RootStore>()(
  persist(storeInitializer, {
    name: "auth-storage",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      auth: state.auth,
    }),
  })
);
