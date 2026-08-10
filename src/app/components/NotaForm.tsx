"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Plus,
  Trash2,
  Printer,
  Download,
  Receipt,
  Package,
  User,
  Hash,
} from "lucide-react";
import NotaPreview from "./NotaPreview";

// ─── Types ──────────────────────────────────────────────────────────────────
export interface BarangItem {
  id: string;
  banyaknya: string;
  namaBarang: string;
  harga: string;
}

export interface NotaData {
  kepada: string;
  notaNo: string;
  tanggal: string;
  items: BarangItem[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatRupiah = (value: number): string => {
  if (isNaN(value) || value === 0) return "";
  return new Intl.NumberFormat("id-ID").format(value);
};

const parseNumber = (val: string): number => {
  const cleaned = val.replace(/[^0-9]/g, "");
  return cleaned === "" ? 0 : parseInt(cleaned, 10);
};

const generateId = () =>
  `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const createEmptyItem = (): BarangItem => ({
  id: generateId(),
  banyaknya: "",
  namaBarang: "",
  harga: "",
});

const getTodayString = () => {
  const d = new Date();
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function NotaForm() {
  const printRef = useRef<HTMLDivElement>(null);

  const [notaData, setNotaData] = useState<NotaData>({
    kepada: "",
    notaNo: "",
    tanggal: getTodayString(),
    items: [createEmptyItem(), createEmptyItem(), createEmptyItem()],
  });
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // ── Derived calculations ───────────────────────────────────────────────────
  const itemsWithJumlah = notaData.items.map((item) => {
    const qty = parseNumber(item.banyaknya);
    const price = parseNumber(item.harga);
    const jumlah = qty * price;
    return { ...item, jumlahNum: jumlah };
  });

  const grandTotal = itemsWithJumlah.reduce(
    (acc, item) => acc + item.jumlahNum,
    0
  );

  // ── Handlers ──────────────────────────────────────────────────────────────
  const updateField = useCallback(
    (field: keyof Omit<NotaData, "items">, value: string) => {
      setNotaData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateItem = useCallback(
    (id: string, field: keyof Omit<BarangItem, "id">, value: string) => {
      setNotaData((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      }));
    },
    []
  );

  const addItem = useCallback(() => {
    setNotaData((prev) => ({
      ...prev,
      items: [...prev.items, createEmptyItem()],
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setNotaData((prev) => {
      if (prev.items.length <= 1) return prev;
      return { ...prev, items: prev.items.filter((item) => item.id !== id) };
    });
  }, []);

  // ── Print handler ─────────────────────────────────────────────────────────
  const handlePrint = () => {
    window.print();
  };

  // ── PDF Download handler (html2canvas + jsPDF) ────────────────────────────
  const handleDownloadPdf = async () => {
    const el = printRef.current;
    if (!el) return;
    setIsGeneratingPdf(true);

    const wrapper = el.parentElement as HTMLElement;
    const savedStyle = wrapper.getAttribute("style") ?? "";

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      wrapper.setAttribute(
        "style",
        [
          "position: fixed",
          "left: 0",
          "top: 0",
          "opacity: 0",
          "pointer-events: none",
          "z-index: -1",
          `width: ${el.offsetWidth || 560}px`,
        ].join(";") + ";"
      );

      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: el.scrollWidth,
        height: el.scrollHeight,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      });

      wrapper.setAttribute("style", savedStyle);

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas kosong");
      }

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height / canvas.width) * pdfWidth;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Nota-${notaData.notaNo || "baru"}-${Date.now()}.pdf`);
    } catch (err) {
      console.error("Gagal generate PDF:", err);
      wrapper.setAttribute("style", savedStyle);
      alert("Gagal generate PDF. Gunakan tombol Print sebagai alternatif.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8 font-comic">
      {/* ── Form Card ─────────────────────────────────────────────────── */}
      <div className="comic-card p-6 sm:p-8 relative">
        {/* Decorative Tape */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-200 border-2 border-black opacity-80 rotate-2 z-20 shadow-[2px_2px_0_#000]"></div>
        
        {/* Card header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-white border-4 border-black rounded-full shadow-[4px_4px_0_#000] transform -rotate-6">
            <Receipt className="w-6 h-6 text-black" strokeWidth={3} />
          </div>
          <div>
            <h2 className="font-black text-2xl uppercase tracking-wider text-black">
              Data Nota
            </h2>
            <p className="font-bold text-gray-700">
              Isi informasi nota dan daftar barang
            </p>
          </div>
        </div>

        {/* ── Header fields ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Kepada */}
          <div className="sm:col-span-1">
            <label
              htmlFor="field-kepada"
              className="flex items-center gap-1.5 font-bold mb-2 uppercase text-black"
            >
              <User className="w-4 h-4" />
              Kepada
            </label>
            <input
              id="field-kepada"
              type="text"
              className="comic-input w-full px-4 py-3 text-lg"
              placeholder="Nama pelanggan..."
              value={notaData.kepada}
              onChange={(e) => updateField("kepada", e.target.value)}
            />
          </div>

          {/* Nota No */}
          <div>
            <label
              htmlFor="field-notano"
              className="flex items-center gap-1.5 font-bold mb-2 uppercase text-black"
            >
              <Hash className="w-4 h-4" />
              Nota No.
            </label>
            <input
              id="field-notano"
              type="text"
              className="comic-input w-full px-4 py-3 text-lg"
              placeholder="001, 002, ..."
              value={notaData.notaNo}
              onChange={(e) => updateField("notaNo", e.target.value)}
            />
          </div>

          {/* Tanggal */}
          <div>
            <label
              htmlFor="field-tanggal"
              className="flex items-center gap-1.5 font-bold mb-2 uppercase text-black"
            >
              📅 Tanggal
            </label>
            <input
              id="field-tanggal"
              type="text"
              className="comic-input w-full px-4 py-3 text-lg"
              placeholder="10 Agustus 2024"
              value={notaData.tanggal}
              onChange={(e) => updateField("tanggal", e.target.value)}
            />
          </div>
        </div>

        {/* ── Items Table ────────────────────────────────────────────── */}
        <div className="mb-6 relative">
          
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-black" strokeWidth={3} />
            <span className="font-black text-xl uppercase">
              Daftar Barang
            </span>
            <span className="ml-auto text-sm font-bold px-3 py-1 border-2 border-black bg-cyan-300 shadow-[2px_2px_0_#000]">
              {notaData.items.length} item
            </span>
          </div>

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-12 gap-3 px-4 py-3 mb-2 font-black uppercase text-black bg-yellow-300 border-4 border-black shadow-[4px_4px_0_#000]">
            <div className="col-span-2 text-center">BANYAKNYA</div>
            <div className="col-span-4">NAMA BARANG</div>
            <div className="col-span-3 text-right">HARGA (Rp)</div>
            <div className="col-span-2 text-right">JUMLAH (Rp)</div>
            <div className="col-span-1" />
          </div>

          {/* Item rows */}
          <div className="space-y-4">
            {itemsWithJumlah.map((item, index) => (
              <div
                key={item.id}
                className="row-animate grid grid-cols-12 gap-3 items-center p-4 bg-white border-4 border-black shadow-[4px_4px_0_#000]"
              >
                {/* Mobile label */}
                <div className="col-span-12 sm:hidden font-black uppercase mb-2 border-b-2 border-black pb-1">
                  Barang #{index + 1}
                </div>

                {/* Banyaknya */}
                <div className="col-span-6 sm:col-span-2">
                  <label className="sm:hidden font-bold mb-1 block uppercase">
                    Banyaknya
                  </label>
                  <input
                    id={`item-banyaknya-${item.id}`}
                    type="number"
                    min="0"
                    className="comic-input w-full px-3 py-3 text-lg text-center"
                    placeholder="0"
                    value={item.banyaknya}
                    onChange={(e) => updateItem(item.id, "banyaknya", e.target.value)}
                  />
                </div>

                {/* Nama Barang */}
                <div className="col-span-6 sm:col-span-4">
                  <label className="sm:hidden font-bold mb-1 block uppercase">
                    Nama Barang
                  </label>
                  <input
                    id={`item-nama-${item.id}`}
                    type="text"
                    className="comic-input w-full px-3 py-3 text-lg"
                    placeholder="Nama barang..."
                    value={item.namaBarang}
                    onChange={(e) => updateItem(item.id, "namaBarang", e.target.value)}
                  />
                </div>

                {/* Harga */}
                <div className="col-span-6 sm:col-span-3">
                  <label className="sm:hidden font-bold mb-1 block uppercase">
                    Harga
                  </label>
                  <input
                    id={`item-harga-${item.id}`}
                    type="number"
                    min="0"
                    className="comic-input w-full px-3 py-3 text-lg text-right"
                    placeholder="0"
                    value={item.harga}
                    onChange={(e) => updateItem(item.id, "harga", e.target.value)}
                  />
                </div>

                {/* Jumlah (read-only) */}
                <div className="col-span-9 sm:col-span-2">
                  <label className="sm:hidden font-bold mb-1 block uppercase">
                    Jumlah
                  </label>
                  <input
                    id={`item-jumlah-${item.id}`}
                    type="text"
                    readOnly
                    className="comic-input w-full px-3 py-3 text-lg text-right font-black"
                    value={formatRupiah(item.jumlahNum)}
                    tabIndex={-1}
                  />
                </div>

                {/* Delete button */}
                <div className="col-span-3 sm:col-span-1 flex justify-center">
                  <button
                    id={`btn-remove-item-${item.id}`}
                    type="button"
                    onClick={() => removeItem(item.id)}
                    disabled={notaData.items.length <= 1}
                    className="w-12 h-12 flex items-center justify-center border-4 border-black transition-all"
                    style={{
                      background: notaData.items.length <= 1 ? "#ccc" : "var(--danger)",
                      color: "#fff",
                      cursor: notaData.items.length <= 1 ? "not-allowed" : "pointer",
                      boxShadow: notaData.items.length <= 1 ? "none" : "4px 4px 0px #000",
                      transform: notaData.items.length <= 1 ? "none" : "rotate(3deg)",
                    }}
                  >
                    <Trash2 className="w-6 h-6" strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add item button */}
          <button
            id="btn-tambah-barang"
            type="button"
            onClick={addItem}
            className="mt-6 flex items-center gap-2 text-lg font-black px-6 py-4 w-full justify-center transition-all border-4 border-black bg-cyan-300 shadow-[6px_6px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#000] active:translate-x-2 active:translate-y-2 active:shadow-none uppercase"
          >
            <Plus className="w-6 h-6" strokeWidth={4} />
            Tambah Barang
          </button>
        </div>

        {/* ── Grand Total ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-6 mt-8 bg-magenta-400 border-4 border-black shadow-[8px_8px_0_#000] transform rotate-1" style={{ backgroundColor: 'var(--accent-primary)' }}>
          <span className="text-xl font-black uppercase text-white drop-shadow-[2px_2px_0_#000]">
            Total Jumlah Rp.
          </span>
          <span className="text-3xl font-black bg-white px-4 py-2 border-4 border-black shadow-[4px_4px_0_#000] transform -rotate-2 mt-4 sm:mt-0">
            {grandTotal > 0 ? `Rp ${formatRupiah(grandTotal)}` : "Rp 0"}
          </span>
        </div>
      </div>

      {/* ── Action Buttons ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-6 mt-8">
        <button
          id="btn-print-nota"
          type="button"
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-3 py-5 px-8 text-xl comic-btn"
          style={{ backgroundColor: 'var(--success)' }}
        >
          <Printer className="w-6 h-6" strokeWidth={3} />
          Print / Save PDF
        </button>

        <button
          id="btn-download-pdf"
          type="button"
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="flex-1 flex items-center justify-center gap-3 py-5 px-8 text-xl comic-btn"
          style={{ 
            backgroundColor: isGeneratingPdf ? '#aaa' : '#fff',
            color: '#000'
          }}
        >
          {isGeneratingPdf ? (
            <>
              <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#000" strokeWidth="4" />
                <path className="opacity-75" fill="#000" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              TUNGGU BENTAR...
            </>
          ) : (
            <>
              <Download className="w-6 h-6" strokeWidth={3} />
              DOWNLOAD PDF
            </>
          )}
        </button>
      </div>

      {/* ── Hidden Nota Preview (for print & html2canvas) ──────────── */}
      <div
        id="nota-print-wrapper"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "560px",
          pointerEvents: "none",
        }}
      >
        <div ref={printRef} id="nota-print-area">
          <NotaPreview
            kepada={notaData.kepada}
            notaNo={notaData.notaNo}
            tanggal={notaData.tanggal}
            items={itemsWithJumlah.map((item) => ({
              banyaknya: item.banyaknya,
              namaBarang: item.namaBarang,
              harga: item.harga,
              jumlah: item.jumlahNum,
            }))}
            grandTotal={grandTotal}
          />
        </div>
      </div>
    </div>
  );
}
