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
        <main className="py-8 bg-page-bg min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-2xl font-bold mb-6">Buat Receipt</h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-7 space-y-4">
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

                    <aside className="lg:col-span-5">
                        <div className="sticky top-24 space-y-4">
                            <TemplateSwitcher />
                            <ReceiptPreviewSwitcher />
                            <PdfPreview />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
