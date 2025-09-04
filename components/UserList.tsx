"use client";
import { useUsersContext } from "@/context/UsersContext";
import { motion } from "framer-motion";
import Link from "next/link";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";
export default function UserList() {
  const { current, loading, error, page, totalPages } = useUsersContext();
  return (
    <>
      <SearchInput />
      <div className="pb-4">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {current.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                      animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/users/${user.id}`}
                          className="text-sm font-medium text-gray-900"
                        >
                          {user.name}
                          <div className="text-sm text-gray-500">
                            @{user.name}
                          </div>
                        </Link>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.company?.name}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {current.length === 0 && (
                <div className="p-4 text-sm text-gray-500">
                  No users match your search.
                </div>
              )}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Showing {current.length} of {current.length} users
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Pagination />
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </div>
      </div>
    </>
  );
}
