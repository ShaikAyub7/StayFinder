"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Footer from "@/components/Footer";

const Providers = ({ children }) => {
  const [queryClient] = useState(() => {
    return new QueryClient({});
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Toaster />
      <main className=" bg-white rounded-lg shadow-lg min-h-screen mt-2">
        {children}
      </main>
      <Footer />
    </QueryClientProvider>
  );
};

export default Providers;
