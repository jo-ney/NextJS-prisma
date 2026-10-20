"use client";

/**
 * import react
 */
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";

const LottieAnimation = dynamic(
  () => import("../app/components/LottieAnimation"),
  {
    ssr: false,
    loading: () => <div style={{ width: 200, height: 200 }} />,
  }
);

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() =>
    router.push(`/food`)
    , 3000)
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "250px" }}>
        <LottieAnimation />
      </div>
    </div>
  );
}
