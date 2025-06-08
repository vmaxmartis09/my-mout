// ✅ authSlice.ts
import { StateCreator, StoreApi } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { RootStore } from "../rootState";

export interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
}

export interface AuthSlice {
  auth: AuthState;
  authActions: {
    setAuth: (auth: AuthState) => Promise<void>;
    clearAuth: () => void;
  };
}

const authReducer = (state: AuthState, action: { type: string; payload?: any }): AuthState => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        user: action.payload?.user ?? null,
        session: action.payload?.session ?? null,
        isAuthenticated: !!action.payload?.user,
      };
    case "CLEAR_AUTH":
      return {
        user: null,
        session: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const createAuthSlice = (
  set: StoreApi<RootStore>["setState"],
  get: StoreApi<RootStore>["getState"],
  store: StoreApi<RootStore>
): AuthSlice => ({
  auth: {
    user: null,
    session: null,
    isAuthenticated: false,
  },
  authActions: {
    setAuth: async (auth) => {
      set((state) => ({
        ...state,
        auth: authReducer(state.auth, { type: "SET_AUTH", payload: auth }),
      }));

      if (auth.user?.id) {
        await get().actions.profileActions.loadProfile(auth.user.id);
      }
    },

    clearAuth: () => {
      set((state) => ({
        ...state,
        auth: authReducer(state.auth, { type: "CLEAR_AUTH" }),
      }));
      get().actions.profileActions.clearProfile();
    },
  },
});

