"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

export default function ReceiptStyleB() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="p-6 border-l-4 border-green-600 bg-gray-50 min-h-64">
            <div className="flex justify-between">
                <h3 className="font-semibold">Receipt</h3>
                <span>{data.issueDate.toLocaleDateString()}</span>
            </div>

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

            <div className="mt-6 text-right font-bold">
                {formatCurrency(result.total)}
            </div>
        </div>
    );
}
