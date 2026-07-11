"use client";

import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          console.log("Service Worker登録成功");
        })
        .catch((err) => {
          console.error("Service Worker登録失敗", err);
        });
    }
  }, []);

  return null;
}