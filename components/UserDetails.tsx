"use client";

import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

interface UserDetailsProps {
  user: string;
}

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
            <Button variant="primary" asChild>
              <Link href="/">← Back to Users</Link>
            </Button>
            </motion.div>
            <CardHeader>User Details</CardHeader>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <motion.div
              className="bg-gray-50 rounded-lg p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Personal Information
              </h2>
              <div className="space-y-3">
                <Detail label="Name" value={user.name} bold />
                <Detail label="Username" value={`@${user.username}`} />
                <Detail label="Email" value={user.email} />
                <Detail label="Phone" value={user.phone} />
                <Detail
                  label="Website"
                  value={
                    <a
                      href={`http://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {user.website}
                    </a>
                  }
                />
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              className="bg-gray-50 rounded-lg p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Address
              </h2>
              <div className="space-y-3">
                <Detail label="Street" value={user?.address?.street} />
                <Detail label="Suite" value={user?.address?.suite} />
                <Detail label="City" value={user?.address?.city} />
                <Detail label="Zipcode" value={user?.address?.zipcode} />
                <Detail
                  label="Geo Location"
                  value={`${user?.address?.geo?.lat}, ${user?.address?.geo?.lng}`}
                />
              </div>
            </motion.div>

            {/* Company */}
            <motion.div
              className="bg-gray-50 rounded-lg p-6 md:col-span-2"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Company
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Detail label="Company Name" value={user?.company?.name} bold />
                <Detail label="Catch Phrase" value={user?.company?.catchPhrase} />
                <Detail label="Business" value={user?.company?.bs} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

// 🔹 Small reusable detail component
function Detail({
  label,
  value,
  bold,
}: {
  label: string;
  value: React.ReactNode;
  bold?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <p
        className={`text-lg text-gray-900 ${bold ? "font-medium" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
