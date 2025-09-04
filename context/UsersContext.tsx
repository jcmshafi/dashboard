"use client";
import { createContext, useContext, ReactNode } from "react";
import useUsers from "@/hooks/useUsers";

type UsersContextType = ReturnType<typeof useUsers>;

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: ReactNode }) {
  const usersHook = useUsers();
  return (
    <UsersContext.Provider value={usersHook}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersContext() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsersContext must be used within UsersProvider");
  return ctx;
}
