"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function ClientInfoForm() {
    const { data, updateField } = useInvoiceStore();

    return (
        <Card>
            <h3 className="text-lg font-semibold">Informasi Klien</h3>

            <div className="mt-3">
                <label className="text-sm font-medium">Nama Klien</label>
                <Input
                    placeholder="Nama Klien"
                    value={data.client.name}
                    onChange={(e) =>
                        updateField("client", {
                            ...data.client,
                            name: e.target.value,
                        })
                    }
                />
            </div>
        </Card>
    );
}
