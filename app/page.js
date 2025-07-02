"use client";

import PopularHomes from "@/components/PopularHomes";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="gap-3 sm:max-w-6xl lg:max-w-[80vw] px-2 py-2 mx-auto">
      <h1 className="text-3xl p-2">Welcome back, {user?.lastName}</h1>
      <PopularHomes />
    </div>
  );
}
