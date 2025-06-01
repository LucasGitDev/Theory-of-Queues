"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getQueryParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const getAll = useCallback((): Record<string, string> => {
    const entries: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      entries[key] = value;
    }
    return entries;
  }, [searchParams]);

  const setQueryParams = useCallback(
    (params: Record<string, string | undefined>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      const query = current.toString();
      router.push(`${location.pathname}${query ? `?${query}` : ""}`);
    },
    [searchParams, router]
  );

  const setMany = useCallback(
    (...pairs: [string, string | undefined][]) => {
      const params: Record<string, string | undefined> = {};
      for (const [key, value] of pairs) {
        params[key] = value;
      }
      setQueryParams(params);
    },
    [setQueryParams]
  );

  return { getQueryParam, getAll, setQueryParams, setMany };
}
