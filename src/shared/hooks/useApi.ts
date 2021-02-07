import { useEffect, useState } from "react";
import { APIConstants } from "../constants"; 

export function getApiUrl(url: string) {
  return `${APIConstants.base}${url}`;
}

export function useApi<Shape>(url: string, method = 'GET') {
  const [data, setData] = useState<Shape | null>(null);
  useEffect(() => {
    async function apiCall() {
      try {
        const response = await fetch(getApiUrl(url), { method });
        const data = await response.json();
        setData(data);
      } catch(error) {
        throw new Error(error);
      }
    }

    apiCall();
  }, [method, url]);

  return data;
}