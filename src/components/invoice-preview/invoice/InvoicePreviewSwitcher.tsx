"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import InvoiceStyleA from "./InvoiceStyleA";
import InvoiceStyleB from "./InvoiceStyleB";
import InvoiceStyleC from "./InvoiceStyleC";

export default function InvoicePreviewSwitcher() {
    const { data } = useInvoiceStore();

    switch (data.template) {
        case "STYLE_B":
            return <InvoiceStyleB />;
        case "STYLE_C":
            return <InvoiceStyleC />;
        default:
            return <InvoiceStyleA />;
    }
}
