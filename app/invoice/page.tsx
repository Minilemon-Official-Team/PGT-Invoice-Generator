"use client";

import { useEffect } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";
import ItemListForm from "@/components/invoice-form/ItemListForm";
import CalculationForm from "@/components/invoice-form/CalculationForm";
import TemplateSwitcher from "@/components/invoice-form/TemplateSwitcher";
import InvoicePreviewSwitcher from "@/components/invoice-preview/invoice/InvoicePreviewSwitcher";
import PdfPreview from "@/components/invoice-preview/PdfPreview";
import DownloadButton from "@/components/invoice-preview/DownloadButton";
import ResetButton from "@/components/invoice-form/ResetButton";

export default function InvoicePage() {
    const hydrated = useHydration();
    const { data, initialize, setDocumentType, hasHydrated } =
        useInvoiceStore();

    useEffect(() => {
        // wait for client hydration and store rehydration
        if (!hydrated) return;
        if (!hasHydrated) return;

        // detect empty store (first-time visit) — conservative check
        const isEmpty =
            data.items.length === 0 &&
            (!data.brand || !data.brand.name) &&
            (!data.client || !data.client.name);

        if (isEmpty) {
            initialize("INVOICE", { reset: true });
            return;
        }

        // if store exists but documentType mismatches page, set only the type
        if (data.documentType !== "INVOICE") {
            setDocumentType("INVOICE");
        }
    }, [hydrated, hasHydrated]);

    if (!hydrated || !hasHydrated) return null;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Invoice Page</h1>
            <pre className="mt-4 bg-slate-100 p-4 rounded">
                {JSON.stringify(data, null, 2)}
            </pre>
            <div className="mt-6 space-y-6">
                <TemplateSwitcher />
                <ItemListForm />
                <CalculationForm />
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InvoicePreviewSwitcher />
                <PdfPreview />
            </div>
            <div className="flex gap-4 mt-6">
                <DownloadButton />
                <ResetButton />
            </div>
        </div>
    );
}
