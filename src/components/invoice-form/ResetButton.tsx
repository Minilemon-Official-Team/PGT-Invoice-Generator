"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import Button from "@/components/ui/Button";

export default function ResetButton() {
    const { reset } = useInvoiceStore();

    return (
        <Button onClick={reset} variant="ghost" className="text-red-600">
            Reset
        </Button>
    );
}
