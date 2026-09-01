"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

export function ConsultingIntent() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (link?.getAttribute("href")?.split("?")[0].toLowerCase() !== "mailto:3d@ryan.ceo") return;
      try {
        // An email click signals interest, not a sent inquiry or a booked session.
        track("consulting_email_click", { page: window.location.pathname });
      } catch {
        // Analytics must never interrupt the native email action.
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
