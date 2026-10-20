"use client"; // Don't forget this in Next.js

import { Lottie } from "lottie-react";
// import CatPlaying from "@/assets/animations/Cat playing animation.json";
import FoxRunning from "@/assets/animations/Running Fox Loop.json";

export default function LottieAnimation() {
  return (
      <Lottie 
        src={FoxRunning} 
        autoplay 
        loop 
        // Lottie canvas fills the container perfectly
        style={{ width: "100%", height: "100%" }} 
      />
  );
}