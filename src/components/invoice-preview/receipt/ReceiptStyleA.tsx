"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

export default function ReceiptStyleA() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="p-6 border bg-white min-h-64">
            <h2 className="text-lg font-bold">RECEIPT</h2>
            <p className="mt-4">Receipt No: {data.invoiceNumber}</p>

            <div className="mt-4">
                {data.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <span>{item.description}</span>
                        <span>
                            {formatCurrency(item.quantity * item.unitPrice)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-6 font-bold text-right">
                Total: {formatCurrency(result.total)}
            </div>
        </div>
    );
}
