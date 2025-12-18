"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import ReceiptStyleA from "./ReceiptStyleA";
import ReceiptStyleB from "./ReceiptStyleB";
import ReceiptStyleC from "./ReceiptStyleC";

export default function ReceiptPreviewSwitcher() {
    const { data } = useInvoiceStore();

    switch (data.template) {
        case "STYLE_B":
            return <ReceiptStyleB />;
        case "STYLE_C":
            return <ReceiptStyleC />;
        default:
            return <ReceiptStyleA />;
    }
}
