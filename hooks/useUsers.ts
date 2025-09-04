import { useEffect, useMemo, useState } from "react";
import { User } from "@/types/user"; 

export default function useUsers(initialPageSize = 5) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((data: User[]) => {
        if (!mounted) return;
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to fetch");
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  return {
    users,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    pageSize,
    setPageSize,
    current,
    totalPages,
  } as const;
}
