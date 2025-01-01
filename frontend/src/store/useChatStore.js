import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import { useAuthStore } from './useAuthStore.js';

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get("/messages/users");
            set({ users: response.data });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, response.data] });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    },

    subcribeToMessage: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;


        if (!socket) {
            console.error("Socket not initialized. Ensure connectSocket is called.");
            return;
        }

        if (!selectedUser) {
            console.warn("No selected user to subscribe to messages.");
            return;
        }

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;
            set({
                messages: [...get().messages, newMessage],
            });
        })
    },

    unsubcribeToMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))