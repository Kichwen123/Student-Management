
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Request failed: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();

        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
          setData([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsPending(false);
        }
      }
    };

    if (!url) {
      setData([]);
      setError("A valid API URL is required.");
      setIsPending(false);
      return;
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    data,
    isPending,
    error,
  };
};

export default useFetch;
