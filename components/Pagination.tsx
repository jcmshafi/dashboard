"use client";
import { useUsersContext } from "../context/UsersContext";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Pagination() {
  const { page, setPage, totalPages } = useUsersContext();

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Prev Button */}
      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
        <Button
          variant="primary"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
      </motion.div>

      {/* Page Numbers */}
      <div className="flex gap-1">
        <AnimatePresence mode="popLayout">
          {pages.map((p) => (
            <motion.div
              key={p}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button
                onClick={() => setPage(p)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  p === page ? "bg-blue-600 text-white" : "bg-white border"
                }`}
              >
                {p}
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Next Button */}
      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
        <Button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          variant="primary"
        >
          Next
        </Button>
      </motion.div>
    </div>
  );
}
