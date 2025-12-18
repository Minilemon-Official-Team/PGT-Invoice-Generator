"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

export default function ReceiptStyleC() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="p-6 border-dashed border-2 min-h-64">
            <h4 className="uppercase tracking-wide">Receipt</h4>
            <div className="mt-4">
                <p className="text-sm">Paid: {formatCurrency(result.total)}</p>
            </div>
        </div>
    );
}
