"use client";

import { useEffect, useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import InvoiceTemplate from "@/components/pdf-templates/InvoiceTemplate";
import ReceiptTemplate from "@/components/pdf-templates/ReceiptTemplate";

export default function PdfPreview() {
    const { data } = useInvoiceStore();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        let objectUrl: string | null = null;

        const generatePreview = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const doc =
                    data.documentType === "INVOICE" ? (
                        <InvoiceTemplate data={data} />
                    ) : (
                        <ReceiptTemplate data={data} />
                    );

                const blob = await pdf(doc).toBlob();
                objectUrl = URL.createObjectURL(blob);

                // set preview URL in state; iframe will pick it up when mounted
                setPreviewUrl(objectUrl);
            } catch (err) {
                console.error("Error generating PDF preview:", err);
                setError("Failed to generate PDF preview. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        generatePreview();

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
                setPreviewUrl((cur) => {
                    if (cur === objectUrl) return null;
                    return cur;
                });
            }
        };
    }, [data]);

    return (
        <div className="border rounded p-6 bg-white">
            <h2 className="text-lg font-bold mb-4">PDF Preview</h2>

            {isLoading && (
                <p className="text-gray-500">Generating preview...</p>
            )}

            {error && <p className="text-red-500">{error}</p>}

            <iframe
                ref={iframeRef}
                src={previewUrl ?? undefined}
                className="w-full border rounded"
                style={{
                    height: "600px",
                    display: isLoading ? "none" : "block",
                }}
                title="PDF Preview"
            />
        </div>
    );
}
