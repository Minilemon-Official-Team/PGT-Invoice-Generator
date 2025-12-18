import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import { InvoiceData } from "@/lib/types";
import { calculateInvoiceTotal } from "@/lib/calculation";
import { formatCurrency } from "@/lib/utils";

const styles = StyleSheet.create({
    page: {
        padding: 36,
        fontSize: 11,
        fontFamily: "Helvetica",
        color: "#111827",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    headerLeft: { flexDirection: "row", alignItems: "center" },
    logo: { width: 52, height: 52, marginRight: 10 },
    brandName: { fontSize: 14, fontWeight: "bold" },
    brandMeta: { fontSize: 9, color: "#374151" },
    docBadge: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    refId: { fontSize: 9, color: "#6b7280", marginTop: 6 },
    recipientBox: {
        padding: 8,
        borderRadius: 6,
        marginVertical: 8,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        paddingBottom: 6,
        marginTop: 6,
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 6,
        alignItems: "center",
    },
    colDesc: { flex: 4, fontSize: 10 },
    colQty: { flex: 1, textAlign: "right", fontSize: 10 },
    colPrice: { flex: 2, textAlign: "right", fontSize: 10 },
    totals: { marginTop: 8 },
    totalsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 3,
    },
    totalsLabel: { fontSize: 10, color: "#374151" },
    totalsValue: { fontSize: 10, fontWeight: "bold" },
    discountRed: { color: "#dc2626" },
    totalBar: {
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 6,
        textAlign: "right",
    },
    footerNote: {
        marginTop: 12,
        padding: 10,
        backgroundColor: "#f3f4f6",
        borderRadius: 6,
        fontSize: 9,
        color: "#374151",
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        fontSize: 9,
        color: "#fff",
        fontWeight: "bold",
    },
});

function hexToRgba(hex: string, alpha = 1) {
    const h = hex.replace("#", "");
    const bigint = parseInt(
        h.length === 3
            ? h
                  .split("")
                  .map((c) => c + c)
                  .join("")
            : h,
        16
    );
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function InvoiceTemplate({ data }: { data: InvoiceData }) {
    const result = calculateInvoiceTotal(data);

    const brandColor = data.brand?.color || "#A435F0";
    const brandLight = hexToRgba(brandColor, 0.08);

    const isInvoice = data.documentType === "INVOICE";

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {data.brand.logo ? (
                            <Image src={data.brand.logo} style={styles.logo} />
                        ) : (
                            <View
                                style={{
                                    ...styles.logo,
                                    backgroundColor: "#f3f4f6",
                                    borderRadius: 6,
                                }}
                            />
                        )}

                        <View>
                            <Text style={styles.brandName}>
                                {data.brand.name || "Nama Brand"}
                            </Text>
                            <Text style={styles.brandMeta}>
                                {data.brand.location}
                            </Text>
                        </View>
                    </View>

                    <View style={{ alignItems: "flex-end" }}>
                        <View
                            style={{
                                ...styles.docBadge,
                                backgroundColor: brandColor,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontSize: 10,
                                    fontWeight: "bold",
                                }}
                            >
                                {isInvoice ? "INVOICE" : "RECEIPT"}
                            </Text>
                        </View>

                        <Text style={styles.refId}>{data.invoiceNumber}</Text>
                    </View>
                </View>

                <View
                    style={{
                        ...styles.recipientBox,
                        backgroundColor: brandLight,
                    }}
                >
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                        Ditujukan Kepada:
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                        {data.client?.name || "-"}
                    </Text>
                </View>

                <View>
                    <View style={styles.tableHeader}>
                        <Text style={styles.colDesc}>Deskripsi</Text>
                        <Text style={styles.colQty}>Jumlah</Text>
                        <Text style={styles.colPrice}>Harga</Text>
                        <Text style={styles.colPrice}>Nominal</Text>
                    </View>

                    {data.items.map((item, idx) => (
                        <View key={idx} style={styles.tableRow}>
                            <Text style={styles.colDesc}>
                                {item.description}
                            </Text>
                            <Text style={styles.colQty}>
                                {String(item.quantity)}
                            </Text>
                            <Text style={styles.colPrice}>
                                {formatCurrency(item.unitPrice)}
                            </Text>
                            <Text style={styles.colPrice}>
                                {formatCurrency(item.quantity * item.unitPrice)}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.totals}>
                    <View style={styles.totalsRow}>
                        <Text style={styles.totalsLabel}>Subtotal</Text>
                        <Text style={styles.totalsValue}>
                            {formatCurrency(result.subtotal)}
                        </Text>
                    </View>

                    <View style={styles.totalsRow}>
                        <Text style={[styles.totalsLabel, styles.discountRed]}>
                            Diskon
                        </Text>
                        <Text style={[styles.totalsValue, styles.discountRed]}>
                            -{formatCurrency(result.discountAmount)}
                        </Text>
                    </View>

                    <View style={styles.totalsRow}>
                        <Text style={styles.totalsLabel}>
                            Pajak {data.taxRate}%
                        </Text>
                        <Text style={styles.totalsValue}>
                            {formatCurrency(result.taxAmount)}
                        </Text>
                    </View>

                    <View
                        style={{
                            ...styles.totalBar,
                            backgroundColor: brandColor,
                        }}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                textAlign: "right",
                                fontSize: 12,
                                fontWeight: "bold",
                            }}
                        >
                            Total: {formatCurrency(result.total)}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={styles.footerNote}>
                            {data.notes || "Terimakasih atas kerjasamanya."}
                        </Text>
                    </View>

                    <View style={{ marginLeft: 12 }}>
                        {isInvoice ? (
                            <View
                                style={{
                                    ...styles.statusBadge,
                                    backgroundColor: "#2563EB",
                                }}
                            >
                                <Text style={{ color: "#fff", fontSize: 9 }}>
                                    Belum Dibayar
                                </Text>
                            </View>
                        ) : (
                            <View
                                style={{
                                    ...styles.statusBadge,
                                    backgroundColor: "#059669",
                                }}
                            >
                                <Text style={{ color: "#fff", fontSize: 9 }}>
                                    Lunas
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={{ marginTop: 14 }}>
                    <Text style={{ fontSize: 10, color: "#6b7280" }}>
                        Terimakasih Atas Kerjasamanya
                    </Text>
                </View>
            </Page>
        </Document>
    );
}
