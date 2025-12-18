"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

export default function HtmlPreview() {
    const { data } = useInvoiceStore();
    const result = calculateInvoiceTotal(data);

    return (
        <div className="border rounded p-6 bg-white min-h-96">
            <h2 className="text-xl font-bold mb-4">{data.documentType}</h2>

            <div className="mb-4">
                <p className="font-semibold">
                    {data.brand.name || "Brand Name"}
                </p>
                <p>{data.brand.location}</p>
            </div>

            <div className="mb-4">
                <p className="font-semibold">Bill To</p>
                <p>{data.client.name || "Client Name"}</p>
            </div>

            <table className="w-full text-sm border mb-4">
                <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="text-left p-2">Item</th>
                        <th className="p-2">Qty</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.length === 0 ? (
                        <tr>
                            <td
                                colSpan={4}
                                className="text-center p-4 text-gray-400"
                            >
                                No items added
                            </td>
                        </tr>
                    ) : (
                        data.items.map((item, i) => (
                            <tr key={i} className="border-b">
                                <td className="p-2">{item.description}</td>
                                <td className="p-2 text-center">
                                    {item.quantity}
                                </td>
                                <td className="p-2 text-right">
                                    {formatCurrency(item.unitPrice)}
                                </td>
                                <td className="p-2 text-right">
                                    {formatCurrency(
                                        item.quantity * item.unitPrice
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="text-right space-y-1">
                <p>Subtotal: {formatCurrency(result.subtotal)}</p>
                <p>Discount: -{formatCurrency(result.discountAmount)}</p>
                <p>Tax: {formatCurrency(result.taxAmount)}</p>
                <p className="font-bold text-lg">
                    Total: {formatCurrency(result.total)}
                </p>
            </div>
        </div>
    );
}
