"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function CalculationForm() {
    const { data, updateField } = useInvoiceStore();

    const result = calculateInvoiceTotal(data);

    return (
        <Card>
            <h3 className="text-lg font-semibold">Perhitungan</h3>

            <div className="flex gap-2 items-center mt-2">
                <Input
                    type="number"
                    placeholder="Tarif Pajak (%)"
                    value={data.taxRate}
                    onChange={(e) =>
                        updateField("taxRate", Number(e.target.value))
                    }
                    className="w-28"
                />

                <select
                    value={data.discountType}
                    onChange={(e) =>
                        updateField(
                            "discountType",
                            e.target.value as "PERCENTAGE" | "NOMINAL"
                        )
                    }
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                >
                    <option value="PERCENTAGE">Persentase (%)</option>
                    <option value="NOMINAL">Nominal (Rp)</option>
                </select>

                <Input
                    type="number"
                    placeholder="Nilai Diskon"
                    value={data.discountValue}
                    onChange={(e) =>
                        updateField("discountValue", Number(e.target.value))
                    }
                    className="w-32"
                />
            </div>

            <div className="mt-4 space-y-1 text-sm text-right">
                <p>Subtotal: {formatCurrency(result.subtotal)}</p>
                <p>Diskon: -{formatCurrency(result.discountAmount)}</p>
                <p>Pajak: {formatCurrency(result.taxAmount)}</p>
                <p className="font-bold text-lg">
                    Total: {formatCurrency(result.total)}
                </p>
            </div>
        </Card>
    );
}
