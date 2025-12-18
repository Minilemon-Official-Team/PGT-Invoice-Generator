import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InvoiceData, InvoiceItem } from "@/lib/types";

/**
 * State Shape
 */
interface InvoiceStore {
    data: InvoiceData;

    // hydration flag — true after persist rehydrates
    hasHydrated: boolean;
    setHasHydrated: (v: boolean) => void;

    // actions
    initialize: (
        type: "INVOICE" | "RECEIPT",
        opts?: { reset?: boolean }
    ) => void;
    setDocumentType: (type: "INVOICE" | "RECEIPT") => void;
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

    // selected template style
    template: "STYLE_A",

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

            hasHydrated: false,
            setHasHydrated: (v: boolean) => set({ hasHydrated: v }),

            initialize: (type, opts = { reset: false }) => {
                if (opts.reset) {
                    set({ data: createDefaultInvoice(type) });
                } else {
                    // non-destructive: only set documentType
                    set((state) => ({
                        data: { ...state.data, documentType: type },
                    }));
                }
            },

            setDocumentType: (type) =>
                set((state) => ({
                    data: { ...state.data, documentType: type },
                })),

            updateField: (key, value) =>
                set((state) => ({ data: { ...state.data, [key]: value } })),

            addItem: (item) =>
                set((state) => ({
                    data: { ...state.data, items: [...state.data.items, item] },
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

            reset: () => set(() => ({ data: createDefaultInvoice("INVOICE") })),
        }),
        {
            name: "invoice-storage",
            onRehydrateStorage: () => (persistedState) => {
                try {
                    // If there is persisted state, revive Date fields so components can use Date methods
                    if (persistedState && (persistedState as any).data) {
                        const d = (persistedState as any).data;
                        if (d.issueDate) {
                            d.issueDate = new Date(d.issueDate);
                        }
                        if (d.dueDate) {
                            d.dueDate = new Date(d.dueDate);
                        }
                    }

                    // mark hydrated after rehydrate completes
                    Promise.resolve().then(() => {
                        // @ts-ignore
                        const s = useInvoiceStore.getState();
                        s.setHasHydrated(true);
                    });
                } catch (e) {
                    console.error("onRehydrateStorage error", e);
                }
            },
        }
    )
);
