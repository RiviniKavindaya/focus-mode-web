import { useState, useEffect, useCallback } from "react";
import { progressService } from "../services/progressService";

export default function useProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await progressService.getProgress();
      setProgress(data);
    } catch (err) {
      setError(err);
      console.error("Progress load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { progress, loading, error, reload: load };
}