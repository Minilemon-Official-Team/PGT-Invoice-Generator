"use client";

import { useEffect } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";

export default function ReceiptPage() {
    const hydrated = useHydration();
    const { data, initialize } = useInvoiceStore();

    useEffect(() => {
        initialize("RECEIPT");
    }, [initialize]);

    if (!hydrated) return null;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Receipt Page</h1>
            <pre className="mt-4 bg-slate-100 p-4 rounded">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}
