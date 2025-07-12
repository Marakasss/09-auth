"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // refresh викличе перезавантаження даних
    router.refresh();
    setLoading(false);
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
};

export default AuthLayout;
