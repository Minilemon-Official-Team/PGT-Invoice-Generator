"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import TemplateCard from "@/components/ui/TemplateCard";

const templates = [
    { key: "STYLE_A", label: "Modern" },
    { key: "STYLE_B", label: "Klasik" },
    { key: "STYLE_C", label: "Minimal" },
] as const;

export default function TemplateSwitcher() {
    const { data, updateField } = useInvoiceStore();

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold">Pilih Template</h3>

            <div className="grid grid-cols-3 gap-3">
                {templates.map((tpl) => (
                    <TemplateCard
                        key={tpl.key}
                        title={tpl.label}
                        active={data.template === tpl.key}
                        onClick={() => updateField("template", tpl.key)}
                    />
                ))}
            </div>
        </div>
    );
}
