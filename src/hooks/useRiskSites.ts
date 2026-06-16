"use client";

import { useEffect, useState } from "react";

export function useRiskSites() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/risk-sites")
      .then((res) => res.json())
      .then((data) => {
        setSites(data);
        setLoading(false);
      });
  }, []);

  return { sites, loading };
}