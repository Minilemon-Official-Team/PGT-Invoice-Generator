"use client";

import { useEffect } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useHydration } from "@/hooks/useHydration";
import ItemListForm from "@/components/invoice-form/ItemListForm";
import CalculationForm from "@/components/invoice-form/CalculationForm";
import TemplateSwitcher from "@/components/invoice-form/TemplateSwitcher";
import BrandInfoForm from "@/components/invoice-form/BrandInfoForm";
import ClientInfoForm from "@/components/invoice-form/ClientInfoForm";
import NotesForm from "@/components/invoice-form/NotesForm";
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
        <main className="py-8 bg-page-bg min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Buat Dokumen</h1>
                        <p className="text-sm text-muted">
                            Isi detailnya untuk membuat dokumen profesional.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDocumentType("INVOICE")}
                            className={`px-3 py-2 rounded-lg border ${
                                data.documentType === "INVOICE"
                                    ? "bg-white shadow font-semibold"
                                    : "bg-transparent"
                            }`}
                        >
                            Invoice
                        </button>

                        <button
                            onClick={() => setDocumentType("RECEIPT")}
                            className={`px-3 py-2 rounded-lg border ${
                                data.documentType === "RECEIPT"
                                    ? "bg-white shadow font-semibold"
                                    : "bg-transparent"
                            }`}
                        >
                            Receipt
                        </button>
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-5 space-y-4">
                        {/* Left: Form Cards (scrollable) */}
                        <div>
                            <BrandInfoForm />
                        </div>

                        <div>
                            <ClientInfoForm />
                        </div>

                        <div>
                            <ItemListForm />
                        </div>

                        <div>
                            <CalculationForm />
                        </div>

                        <div>
                            <NotesForm />
                        </div>

                        <div className="flex gap-3 mt-4">
                            <DownloadButton />
                            <ResetButton />
                        </div>
                    </div>

                    <aside className="lg:col-span-7">
                        <div className="sticky top-20">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="w-2/3">
                                    <TemplateSwitcher />
                                </div>

                                <div className="flex items-center gap-2">
                                    <DownloadButton />
                                </div>
                            </div>

                            <InvoicePreviewSwitcher />
                            <div className="mt-4">
                                <PdfPreview />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
