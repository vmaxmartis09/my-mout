import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { StoreApi } from "zustand";
import { AuthSlice, createAuthSlice } from "./slices/authSlice";
import { createProfileSlice, ProfileSlice } from "./slices/profileStlice";

// Gom các actions lại thành 1 object
export interface Actions {
  authActions: AuthSlice["authActions"];
  profileActions: ProfileSlice["profileActions"];
}

// RootStore chỉ chứa state + grouped actions
export interface RootStore {
  auth: AuthSlice["auth"];
  profile: ProfileSlice["profile"];
  actions: Actions;
}

const storeInitializer = (
  set: StoreApi<RootStore>["setState"],
  get: StoreApi<RootStore>["getState"],
  store: StoreApi<RootStore>
): RootStore => {
  const authSlice = createAuthSlice(set, get, store);
  const profileSlice = createProfileSlice(set, get, store);

  return {
    auth: authSlice.auth,
    profile: profileSlice.profile,
    actions: {
      authActions: authSlice.authActions,
      profileActions: profileSlice.profileActions,
    },
  };
};

export const useRootStore = create<RootStore>()(
  persist(storeInitializer, {
    name: "auth-storage",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      auth: state.auth,
      profile: state.profile,
    }),
  })
);
