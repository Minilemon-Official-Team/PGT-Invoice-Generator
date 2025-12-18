"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

export default function InvoiceStyleC() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="p-6 border-dashed border-2 min-h-96">
            <h2 className="uppercase tracking-widest mb-6">Invoice</h2>

            <p className="text-sm">Items: {data.items.length}</p>

            <p className="mt-8 text-2xl font-bold">
                {formatCurrency(result.total)}
            </p>
        </div>
    );
}
