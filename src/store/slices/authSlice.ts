import { StateCreator } from "zustand";
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

// Reducer cho auth
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

export const createAuthSlice: StateCreator<RootStore, [], [], AuthSlice> = (set, get) => ({
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

      // Chỉ gọi loadProfile nếu userId tồn tại (tránh lỗi khi user null)
      if (auth.user?.id) {
        await get().profileActions.loadProfile(auth.user.id);
      }
    },

    clearAuth: () => {
      set((state) => ({
        ...state,
        auth: authReducer(state.auth, { type: "CLEAR_AUTH" }),
      }));
      get().profileActions.clearProfile();
    },
  },
});