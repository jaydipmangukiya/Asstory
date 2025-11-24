"use client";

import { useEffect } from "react";

export default function RazorpayScriptLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Script already exists? Don't load again.
    if (document.getElementById("razorpay-script")) return;

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
