"use client";

import { useEffect } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";
import ItemListForm from "@/components/invoice-form/ItemListForm";
import CalculationForm from "@/components/invoice-form/CalculationForm";
import TemplateSwitcher from "@/components/invoice-form/TemplateSwitcher";
import ReceiptPreviewSwitcher from "@/components/invoice-preview/receipt/ReceiptPreviewSwitcher";
import PdfPreview from "@/components/invoice-preview/PdfPreview";
import DownloadButton from "@/components/invoice-preview/DownloadButton";
import ResetButton from "@/components/invoice-form/ResetButton";

export default function ReceiptPage() {
    const hydrated = useHydration();
    const { data, initialize, setDocumentType, hasHydrated } =
        useInvoiceStore();

    useEffect(() => {
        if (!hydrated) return;
        if (!hasHydrated) return;

        const isEmpty =
            data.items.length === 0 &&
            (!data.brand || !data.brand.name) &&
            (!data.client || !data.client.name);

        if (isEmpty) {
            initialize("RECEIPT", { reset: true });
            return;
        }

        if (data.documentType !== "RECEIPT") {
            setDocumentType("RECEIPT");
        }
    }, [hydrated, hasHydrated]);

    if (!hydrated || !hasHydrated) return null;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Receipt Page</h1>
            <pre className="mt-4 bg-slate-100 p-4 rounded">
                {JSON.stringify(data, null, 2)}
            </pre>
            <div className="mt-6 space-y-6">
                <TemplateSwitcher />
                <ItemListForm />
                <CalculationForm />
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReceiptPreviewSwitcher />
                <PdfPreview />
            </div>
            <div className="flex gap-4 mt-6">
                <DownloadButton />
                <ResetButton />
            </div>
        </div>
    );
}
