"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import React, { ReactNode } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
