"use client";

import UserList from "@/components/UserList";
import { UsersProvider } from "@/context/UsersContext";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      {/* <AnimatedBackground/> */}
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            User Management
          </h1>
          <UsersProvider>
            <UserList />
          </UsersProvider>
        </div>
      </motion.div>
    </main>
  );
}
