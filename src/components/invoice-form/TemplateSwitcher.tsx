"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";

const templates = ["STYLE_A", "STYLE_B", "STYLE_C"] as const;

export default function TemplateSwitcher() {
    const { data, updateField } = useInvoiceStore();

    return (
        <div className="space-y-2">
            <h3 className="font-bold">Template Style</h3>

            <div className="flex gap-2">
                {templates.map((tpl) => (
                    <button
                        key={tpl}
                        onClick={() => updateField("template", tpl)}
                        className={`px-4 py-2 border rounded ${
                            data.template === tpl
                                ? "bg-blue-600 text-white"
                                : "bg-white"
                        }`}
                    >
                        {tpl.replace("STYLE_", "Style ")}
                    </button>
                ))}
            </div>
        </div>
    );
}
