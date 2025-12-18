"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

export default function InvoiceStyleB() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="border-l-8 border-blue-600 p-6 bg-gray-50 min-h-96">
            <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold">Invoice</h2>
                <span>{data.invoiceNumber}</span>
            </div>

            {data.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                    <span>{item.description}</span>
                    <span>
                        {formatCurrency(item.quantity * item.unitPrice)}
                    </span>
                </div>
            ))}

            <p className="text-right text-lg font-bold mt-6">
                {formatCurrency(result.total)}
            </p>
        </div>
    );
}
