"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

export default function InvoiceStyleA() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="border p-6 bg-white min-h-96">
            <h2 className="text-2xl font-bold mb-4">INVOICE</h2>

            <p className="font-semibold">{data.brand.name}</p>

            <table className="w-full mt-4 text-sm border">
                <tbody>
                    {data.items.map((item, i) => (
                        <tr key={i} className="border-b">
                            <td className="p-2">{item.description}</td>
                            <td className="p-2 text-right">
                                {formatCurrency(item.quantity * item.unitPrice)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="text-right font-bold mt-4">
                Total: {formatCurrency(result.total)}
            </p>
        </div>
    );
}
