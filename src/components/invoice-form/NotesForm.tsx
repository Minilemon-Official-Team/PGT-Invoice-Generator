"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import Card from "@/components/ui/Card";

export default function NotesForm() {
    const { data, updateField } = useInvoiceStore();

    return (
        <Card>
            <h3 className="text-lg font-semibold">Catatan Tambahan</h3>
            <textarea
                className="w-full mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm"
                placeholder="Catatan tambahan untuk pelanggan..."
                value={data.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                rows={4}
            />
        </Card>
    );
}
