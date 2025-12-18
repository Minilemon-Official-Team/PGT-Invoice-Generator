import { z } from "zod";
import { InvoiceSchema, InvoiceItemSchema } from "./schema";

export type InvoiceData = z.infer<typeof InvoiceSchema>;
export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;

// Template types for Invoice & Receipt
export type InvoiceTemplate = "STYLE_A" | "STYLE_B" | "STYLE_C";
export type ReceiptTemplate = "STYLE_A" | "STYLE_B" | "STYLE_C";
