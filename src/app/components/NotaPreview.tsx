import React from "react";

interface NotaItem {
  banyaknya: string;
  namaBarang: string;
  harga: string;
  jumlah: number;
}

interface NotaPreviewProps {
  kepada: string;
  notaNo: string;
  tanggal: string;
  items: NotaItem[];
  grandTotal: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmtNum = (value: number): string => {
  if (!value || value === 0) return "";
  return new Intl.NumberFormat("id-ID").format(value);
};

const fmtHarga = (val: string): string => {
  const num = parseInt(val.replace(/[^0-9]/g, ""), 10);
  if (isNaN(num) || num === 0) return "";
  return new Intl.NumberFormat("id-ID").format(num);
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function NotaPreview({
  kepada,
  notaNo,
  tanggal,
  items,
  grandTotal,
}: NotaPreviewProps) {
  const MIN_ROWS = 10;
  const rows = [...items];
  while (rows.length < MIN_ROWS) {
    rows.push({ banyaknya: "", namaBarang: "", harga: "", jumlah: 0 });
  }

  const STAMP = "/1000184563-removebg-preview.png";

  // ── Shared styles ──────────────────────────────────────────────────────────
  const tdBase: React.CSSProperties = {
    border: "1px solid #000",
    padding: "5px 7px",      // ← cukup ruang, tidak mepet
    fontSize: "10pt",
    lineHeight: "1.3",
    verticalAlign: "middle",
    height: "22px",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };

  const thBase: React.CSSProperties = {
    ...tdBase,
    fontWeight: "bold",
    textAlign: "center",
    background: "#d0d0d0",
    height: "24px",
    fontSize: "10pt",
  };

  return (
    <div
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        color: "#000",
        background: "#fff",
        width: "148mm",
        minHeight: "210mm",
        padding: "12mm 14mm 14mm 14mm",
        boxSizing: "border-box",
      }}
    >
      {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "8px",
        }}
      >
        {/* Left — NOTA NO */}
        <div style={{ alignSelf: "flex-end" }}>
          <span style={{ fontWeight: "bold", fontSize: "14pt" }}>
            NOTA NO.&nbsp;
          </span>
          <span style={{ fontSize: "13pt", fontWeight: "normal" }}>
            {notaNo || ""}
          </span>
        </div>

        {/* Right — tanggal + kepada */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            width: "58mm",
          }}
        >
          {/* Baris 1 — tanggal */}
          <div
            style={{
              borderBottom: "1px solid #000",
              fontSize: "10pt",
              textAlign: "right",
              paddingBottom: "2px",
              paddingRight: "2px",
            }}
          >
            {tanggal || "\u00A0"}
          </div>

          {/* Baris 2 — Kepada + nama */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "5px" }}>
            <span style={{ fontSize: "10pt", whiteSpace: "nowrap", flexShrink: 0 }}>
              Kepada
            </span>
            <div
              style={{
                flex: 1,
                borderBottom: "1px solid #000",
                fontSize: "10pt",
                paddingBottom: "2px",
                paddingLeft: "3px",
                minWidth: 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {kepada || "\u00A0"}
            </div>
          </div>

          {/* Baris 3 — ekstra (kota / alamat) */}
          <div
            style={{
              borderBottom: "1px solid #000",
              fontSize: "10pt",
              minHeight: "16px",
            }}
          >
            &nbsp;
          </div>
        </div>
      </div>

      {/* ══ TABLE ═══════════════════════════════════════════════════════════ */}
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          tableLayout: "fixed",
          marginBottom: "0",
        }}
      >
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "40%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead>
          <tr>
            <th style={{ ...thBase, textAlign: "center" }}>BANYAKNYA</th>
            <th style={{ ...thBase, textAlign: "center" }}>NAMA BARANG</th>
            <th style={{ ...thBase, textAlign: "center" }}>HARGA</th>
            <th style={{ ...thBase, textAlign: "center" }}>JUMLAH</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td style={{ ...tdBase, textAlign: "center" }}>
                {row.banyaknya || ""}
              </td>
              <td style={{ ...tdBase, textAlign: "left" }}>
                {row.namaBarang || ""}
              </td>
              <td style={{ ...tdBase, textAlign: "right" }}>
                {fmtHarga(row.harga)}
              </td>
              <td style={{ ...tdBase, textAlign: "right" }}>
                {row.jumlah > 0 ? fmtNum(row.jumlah) : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ══ JUMLAH RP ════════════════════════════════════════════════════════ */}
      {/*
        Layout: [garis kiri untuk tanda terima]  [Jumlah Rp. | angka]
        Lebar "Jumlah Rp. | angka" = 40% table = kolom HARGA+JUMLAH
      */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* Spacer kiri */}
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", paddingBottom: "4px" }}>
          <div style={{ width: "38mm", borderBottom: "1px solid #000" }} />
        </div>

        {/* Label "Jumlah Rp." */}
        <div
          style={{
            border: "1px solid #000",
            borderTop: "none",
            padding: "5px 8px",
            fontSize: "10pt",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
          }}
        >
          Jumlah Rp.
        </div>

        {/* Angka total (lebar = kolom JUMLAH = 20%) */}
        <div
          style={{
            border: "1px solid #000",
            borderTop: "none",
            borderLeft: "none",
            padding: "5px 8px",
            fontSize: "10pt",
            fontWeight: grandTotal > 0 ? "bold" : "normal",
            textAlign: "right",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {grandTotal > 0 ? fmtNum(grandTotal) : ""}
        </div>
      </div>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      {/*
        Dibuat dengan position:relative agar stempel (position:absolute)
        bisa ditempatkan di sudut kanan atas footer, overlap "Hormat Kami,"
        Ruang footer cukup besar (60mm min-height) agar stempel tidak keluar.
      */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "14px",
          position: "relative",
          minHeight: "62mm",
        }}
      >
        {/* Kiri — Tanda Terima */}
        <div>
          <p style={{ margin: "0 0 32px 0", fontSize: "10.5pt" }}>
            Tanda Terima
          </p>
          <div style={{ width: "38mm", borderBottom: "1px solid #000" }} />
        </div>

        {/* Kanan — Hormat Kami + garis tanda tangan */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <p style={{ margin: "0 0 0 0", fontSize: "10.5pt" }}>Hormat Kami,</p>
          {/* Garis tanda tangan — ada jarak dari "Hormat Kami," */}
          <div
            style={{
              width: "38mm",
              borderBottom: "1px solid #000",
              marginTop: "52px",
            }}
          />
        </div>

        {/* Stempel — absolute, besar, di kanan atas footer,
            sengaja overlap "Hormat Kami," dari atas */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STAMP}
          alt="Stempel Surya Elektronik Baru"
          style={{
            position: "absolute",
            right: "0mm",
            top: "-6mm",         // naik sedikit ke atas "Hormat Kami,"
            width: "48mm",       // ukuran besar agar bulat terlihat jelas
            height: "48mm",
            objectFit: "contain",
            opacity: 0.92,
            mixBlendMode: "multiply",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    </div>
  );
}
