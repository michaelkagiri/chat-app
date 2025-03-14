import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    onlineUsers: [],

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error("Failed to fetch users");
    }finally{
        set({isUsersLoading:false});
    }
    },

    getMessages:async (userId) => {
        set({isMessagesLoading:true});
        try {
         const res = await axiosInstance.get(`/messages/${userId}`);
         set({messages:res.data});   
        } catch (error) {
            toast.error('error in fetching the messages')
        }finally{
            set({isMessagesLoading: false});
        }
    },

    sendMessages: async (messageData) => {
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages,res.data]})
        } catch (error) {
            toast.error('error at sending messages')
        }
    },


    //optimise ths later
    setSelectedUser: (selectedUser) => 
        set((state) => {
          if (state.selectedUser?._id === selectedUser?._id) return state; // Avoid redundant updates
          return { selectedUser };
        }),
      
}));