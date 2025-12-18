"use client";

import { useState } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

export default function ItemListForm() {
    const { data, addItem, removeItem } = useInvoiceStore();

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);

    const handleAdd = () => {
        if (!description) return;

        addItem({
            description,
            quantity,
            unitPrice,
        });

        setDescription("");
        setQuantity(1);
        setUnitPrice(0);
    };

    return (
        <Card className="space-y-4">
            <h3 className="text-lg font-semibold">Barang / Jasa</h3>

            <div className="flex gap-2">
                <Input
                    placeholder="Deskripsi"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-24"
                />

                <Input
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(Number(e.target.value))}
                    className="w-32"
                />

                <Button onClick={handleAdd} className="ml-1">
                    Tambah Data
                </Button>
            </div>

            <ul className="space-y-2">
                {data.items.map((item, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center border p-2 rounded"
                    >
                        <div className="text-sm">
                            <div className="font-medium">
                                {item.description}
                            </div>
                            <div className="text-xs text-muted">
                                {item.quantity} ×{" "}
                                {formatCurrency(item.unitPrice)}
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold">
                                {formatCurrency(item.quantity * item.unitPrice)}
                            </div>
                            <button
                                onClick={() => removeItem(index)}
                                className="text-red-500 text-sm mt-1"
                            >
                                Hapus
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
