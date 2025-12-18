import Link from "next/link";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-page-bg py-16">
            <div className="max-w-5xl mx-auto px-6">
                <nav className="flex items-center justify-between mb-12">
                    <div className="text-xl font-bold">MiniLemon</div>
                    <div className="flex gap-6 text-sm text-muted">
                        <a href="#">Beranda</a>
                        <a href="#">Tentang</a>
                        <a href="#">Kontak</a>
                    </div>
                </nav>

                <section className="grid lg:grid-cols-12 gap-8 items-center mb-12">
                    <div className="lg:col-span-7">
                        <h1 className="text-3xl font-extrabold mb-4">
                            Buat Invoice & Receipt Profesional dalam Hitungan
                            Menit
                        </h1>
                        <p className="text-md text-muted mb-6">
                            Cepat, mudah, dan profesional untuk UMKM dan
                            freelancer
                        </p>

                        <div className="flex gap-3">
                            <Link
                                href="/invoice"
                                className="bg-primary text-white px-5 py-3 rounded-lg shadow"
                            >
                                Mulai Sekarang
                            </Link>
                            <Link
                                href="/invoice"
                                className="bg-white border border-gray-200 px-4 py-3 rounded-lg"
                            >
                                Pelajari Lebih Lanjut
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="bg-card-bg rounded-xl p-6 shadow-soft-md border border-border">
                            <h3 className="font-semibold mb-2">
                                Pilih Dokumen
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/invoice"
                                    className="bg-white rounded-lg p-4 flex flex-col items-start gap-2 shadow-sm hover:shadow-md"
                                >
                                    <div className="text-lg font-semibold">
                                        Invoice
                                    </div>
                                    <div className="text-sm text-muted">
                                        Buat faktur profesional untuk pelanggan
                                    </div>
                                    <div className="mt-auto">
                                        <span className="text-primary font-medium">
                                            Buat Sekarang →
                                        </span>
                                    </div>
                                </Link>

                                <Link
                                    href="/receipt"
                                    className="bg-white rounded-lg p-4 flex flex-col items-start gap-2 shadow-sm hover:shadow-md"
                                >
                                    <div className="text-lg font-semibold">
                                        Receipt
                                    </div>
                                    <div className="text-sm text-muted">
                                        Buat kuitansi / struk pembayaran
                                    </div>
                                    <div className="mt-auto">
                                        <span className="text-primary font-medium">
                                            Buat Sekarang →
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border">
                        <h4 className="font-semibold mb-2">
                            Perhitungan otomatis
                        </h4>
                        <p className="text-sm text-muted">
                            Subtotal, diskon, dan pajak dihitung otomatis.
                        </p>
                    </div>
                    <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border">
                        <h4 className="font-semibold mb-2">
                            Template profesional
                        </h4>
                        <p className="text-sm text-muted">
                            Pilih template yang cocok untuk brand Anda.
                        </p>
                    </div>
                    <div className="bg-card-bg rounded-xl p-5 shadow-soft-md border border-border">
                        <h4 className="font-semibold mb-2">Ekspor PDF</h4>
                        <p className="text-sm text-muted">
                            Unduh dan bagikan dalam format PDF siap cetak.
                        </p>
                    </div>
                </section>

                <footer className="mt-12 text-center text-sm text-muted">
                    &copy; {new Date().getFullYear()} MiniLemon — Semua hak
                    dilindungi.
                </footer>
            </div>
        </main>
    );
}
