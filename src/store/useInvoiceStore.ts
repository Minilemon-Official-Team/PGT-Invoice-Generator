import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InvoiceData, InvoiceItem } from "@/lib/types";

/**
 * State Shape
 */
interface InvoiceStore {
    data: InvoiceData;

    // actions
    initialize: (type: "INVOICE" | "RECEIPT") => void;
    updateField: <K extends keyof InvoiceData>(
        key: K,
        value: InvoiceData[K]
    ) => void;

    addItem: (item: InvoiceItem) => void;
    updateItem: (index: number, item: InvoiceItem) => void;
    removeItem: (index: number) => void;

    reset: () => void;
}

/**
 * Default Factory
 */
const createDefaultInvoice = (type: "INVOICE" | "RECEIPT"): InvoiceData => ({
    documentType: type,

    invoiceNumber: `INV-${Date.now()}`,
    issueDate: new Date(),
    dueDate: type === "INVOICE" ? new Date() : undefined,

    brand: {
        name: "",
        location: "",
        contact: "",
        logo: "",
        color: "#008BFF",
    },

    client: {
        name: "",
    },

    items: [],

    taxRate: 0,
    discountType: "PERCENTAGE",
    discountValue: 0,

    status: type === "INVOICE" ? "PENDING" : "PAID",
    notes: "",
});

/**
 * Zustand Store
 */
export const useInvoiceStore = create<InvoiceStore>()(
    persist(
        (set) => ({
            data: createDefaultInvoice("INVOICE"),

            initialize: (type) =>
                set(() => ({
                    data: createDefaultInvoice(type),
                })),

            updateField: (key, value) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        [key]: value,
                    },
                })),

            addItem: (item) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        items: [...state.data.items, item],
                    },
                })),

            updateItem: (index, item) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        items: state.data.items.map((i, idx) =>
                            idx === index ? item : i
                        ),
                    },
                })),

            removeItem: (index) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        items: state.data.items.filter(
                            (_, idx) => idx !== index
                        ),
                    },
                })),

            reset: () =>
                set(() => ({
                    data: createDefaultInvoice("INVOICE"),
                })),
        }),
        {
            name: "invoice-storage",
        }
    )
);
