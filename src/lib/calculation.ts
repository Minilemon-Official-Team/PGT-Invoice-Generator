import { InvoiceItem, InvoiceData } from "./types";

export interface InvoiceCalculationResult {
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    total: number;
}

/**
 * Hitung subtotal dari item
 */
export const calculateSubtotal = (items: InvoiceItem[]): number => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
};

/**
 * Hitung diskon
 */
export const calculateDiscount = (
    subtotal: number,
    discountType: InvoiceData["discountType"],
    discountValue: number
): number => {
    if (subtotal <= 0) return 0;

    if (discountType === "PERCENTAGE") {
        return Math.min(subtotal, (subtotal * discountValue) / 100);
    }

    return Math.min(subtotal, discountValue);
};

/**
 * Hitung pajak
 */
export const calculateTax = (
    amountAfterDiscount: number,
    taxRate: number
): number => {
    if (amountAfterDiscount <= 0) return 0;
    return (amountAfterDiscount * taxRate) / 100;
};

/**
 * Hitung total keseluruhan
 */
export const calculateInvoiceTotal = (
    data: InvoiceData
): InvoiceCalculationResult => {
    const subtotal = calculateSubtotal(data.items);
    const discountAmount = calculateDiscount(
        subtotal,
        data.discountType,
        data.discountValue
    );

    const afterDiscount = subtotal - discountAmount;
    const taxAmount = calculateTax(afterDiscount, data.taxRate);

    const total = afterDiscount + taxAmount;

    return {
        subtotal,
        discountAmount,
        taxAmount,
        total,
    };
};
