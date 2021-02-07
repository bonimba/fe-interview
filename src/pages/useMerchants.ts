import { useEffect, useState } from "react";
import { useApi } from "../shared/hooks";
import { Merchant } from "./Merchants";

export function filterByBill(data: readonly Merchant[] | null, isBill: boolean) {
  return (data ?? []).filter(merch => merch.isBill === isBill);
}

export function useMerchants() {
  const data = useApi<readonly Merchant[]>('merchants');
  const [merchants, setMerchants] = useState(data ?? []);

  useEffect(() => {
    setMerchants(data ?? [])
  }, [data])

  return [merchants, setMerchants] as const;
}