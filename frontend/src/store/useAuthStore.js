import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = "http://localhost:8000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoading: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check');

      set({ authUser: response.data });

    } catch (error) {
      console.error("Error in checkAuth", error);
      set({ authUser: null });
      get().connectSocket();
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post('/auth/signup', data);
      set({ authUser: response.data.user });
      toast.success("Account created successfully");

    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data.user });
      toast.success("Logged in successfully");
      get().connectSocket();

    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disConnectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: response.data.user });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("error in update profile:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id
      },
      reconnection: true,
      reconnectionAttempts: 10, // Adjust as needed
      reconnectionDelay: 1000,
    });
    socket.connect();

    set({ socket: socket});

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds});
    });
  },
  disConnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));