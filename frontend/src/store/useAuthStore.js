import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { data } from "react-router";

export const useAuthStore = create((set) => ({
    authUser: null,
     isSignUp: false,
     isLoggingIn: false,
     isUpdatingProfile: false,

     isCheckingAuth: true,
        checkAuth: async () => {
            set({ isCheckingAuth: true });
            try {
                const res = await axiosInstance.get("/auth/check");

                set({authUser:res.data})
            } catch (error) {
                set({authUser: null });                
                
            } finally {
                set({isCheckingAuth: false });
            }
        },

        signup: async (data) => {
            set({isSignUp: true});
            try {
                const res = await axiosInstance.post("/auth/signup", data);
                set({authUser:res.data});
                toast.success("Account created successfully");
            } catch (error) {
                toast.error(error.response.data.message);
            }finally {
                set({isSignUp: false });
            }
        },

        login: async (data) => {
            set({isLoggingIn:true});
            try {
                const res = await axiosInstance.post("/auth/login", data);
                set({authUser: res.data});
                toast.success("logged in sucessfully ")
            } catch (error) {
                toast.error(error.response.data.message);
            }
            finally{
                set({isLoggingIn: false});
            }
        },

        logout: async () => {
            
            try {
                await axiosInstance.post("/auth/logout");
                localStorage.removeItem("token"); 
                set({authUser: null})
                toast.success("logged out successfully");
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },

        updateProfile: async (data) => {
            set({ isUpdatingProfile: true });
        
            try {
                console.log("Updating profile with data:", data);
        
                const res = await axiosInstance.put("/auth/update-profile", data);
                
                console.log("Profile update response:", res.data);
                
                set({ authUser: res.data });
                toast.success("Profile updated successfully!");
            } catch (error) {
                console.error("Profile update failed:", error);
        
                if (error.response) {
                    console.error("Server response:", error.response.data);
                    toast.error(error.response.data.message || "Profile update failed.");
                } else {
                    toast.error("Network error. Please try again.");
                }
            } finally {
                set({ isUpdatingProfile: false });
            }
        },
        
        
}));