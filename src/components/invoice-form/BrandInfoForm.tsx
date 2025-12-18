"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import LogoUpload from "./LogoUpload";

export default function BrandInfoForm() {
    const { data, updateField } = useInvoiceStore();

    return (
        <Card>
            <h3 className="text-lg font-semibold">Informasi Brand</h3>

            <div className="mt-3 grid grid-cols-1 gap-3">
                <div>
                    <label className="text-sm font-medium">Nama Brand</label>
                    <Input
                        placeholder="Nama Brand"
                        value={data.brand.name}
                        onChange={(e) =>
                            updateField("brand", {
                                ...data.brand,
                                name: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Lokasi</label>
                    <Input
                        placeholder="Lokasi"
                        value={data.brand.location}
                        onChange={(e) =>
                            updateField("brand", {
                                ...data.brand,
                                location: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">
                        Kontak / Media Sosial
                    </label>
                    <Input
                        placeholder="Kontak atau media sosial"
                        value={data.brand.contact}
                        onChange={(e) =>
                            updateField("brand", {
                                ...data.brand,
                                contact: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="flex gap-2 items-start">
                    <div className="flex-1">
                        <label className="text-sm font-medium">
                            Warna Brand
                        </label>
                        <Input
                            type="color"
                            value={data.brand.color}
                            onChange={(e) =>
                                updateField("brand", {
                                    ...data.brand,
                                    color: e.target.value,
                                })
                            }
                            className="w-20 h-10 p-0"
                        />
                    </div>

                    <div className="w-64">
                        <LogoUpload />
                    </div>
                </div>
            </div>
        </Card>
    );
}
