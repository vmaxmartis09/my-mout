import { StateCreator } from "zustand";
import { fetchUserProfile } from "@/app/api/fetchProfile";
import { UserProfile } from "@/lib/supabase/type";
import { RootStore } from "../rootState";

export interface ProfileState {
  data: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface ProfileSlice {
  profile: ProfileState;
  profileActions: {
    loadProfile: (userId: string) => Promise<void>;
    clearProfile: () => void;
  };
}

// Reducer cho profile
const profileReducer = (
  state: ProfileState,
  action: { type: string; payload?: any }
): ProfileState => {
  switch (action.type) {
    case "LOAD_PROFILE_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOAD_PROFILE_SUCCESS":
      return {
        ...state,
        data: action.payload ?? null,
        loading: false,
        error: action.payload ? null : "Không tìm thấy profile",
      };
    case "LOAD_PROFILE_ERROR":
      return {
        ...state,
        loading: false,
        error:
          action.payload instanceof Error
            ? action.payload.message
            : "Lỗi tải profile",
      };
    case "CLEAR_PROFILE":
      return {
        ...state,
        data: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const createProfileSlice: StateCreator<
  RootStore,
  [],
  [],
  ProfileSlice
> = (set) => ({
  profile: {
    data: null,
    loading: false,
    error: null,
  },

  profileActions: {
    loadProfile: async (userId: string) => {
      if (!userId) {
        set((state) => ({
          ...state,
          profile: profileReducer(state.profile, {
            type: "LOAD_PROFILE_ERROR",
            payload: new Error("userId không hợp lệ"),
          }),
        }));
        return;
      }

      set((state) => ({
        ...state,
        profile: profileReducer(state.profile, { type: "LOAD_PROFILE_START" }),
      }));

      try {
        const profile = await fetchUserProfile(userId);
        set((state) => ({
          ...state,
          profile: profileReducer(state.profile, {
            type: "LOAD_PROFILE_SUCCESS",
            payload: profile,
          }),
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          profile: profileReducer(state.profile, {
            type: "LOAD_PROFILE_ERROR",
            payload: error,
          }),
        }));
      }
    },

    clearProfile: () => {
      set((state) => ({
        ...state,
        profile: profileReducer(state.profile, { type: "CLEAR_PROFILE" }),
      }));
    },
  },
});