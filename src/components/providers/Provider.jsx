"use client";

import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

export const Provider = ({ children }) => {
  return (
    <NextUIProvider>
      <div>{children}</div>
      <Toaster position="top-center" toastOptions={{
        style: {
          background: "#D6D3D1",
          color: '#292524',
        },
      }} />
    </NextUIProvider>
  );
};
