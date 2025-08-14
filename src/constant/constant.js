"use client";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        style: {
          background: "#333",
          color: "#fff",
          fontSize: "14px",
        },
      }}
    />
  );
}

export const useToast = () => {
  return {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    loading: (message) => toast.loading(message),
  };
};