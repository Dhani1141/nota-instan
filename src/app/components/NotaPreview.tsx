import React from "react";

interface NotaItem {
  banyaknya: string;
  namaBarang: string;
  harga: string;
  jumlah: number;
}

interface NotaPreviewProps {
  kepada: string;
  alamat?: string;
  notaNo: string;
  tanggal: string;
  uangMuka?: number;
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
  alamat = "",
  notaNo, // Not used strictly in this layout but we can put it
  tanggal,
  uangMuka = 0,
  items,
  grandTotal,
}: NotaPreviewProps) {
  const MIN_ROWS = 10;
  const rows = [...items];
  while (rows.length < MIN_ROWS) {
    rows.push({ banyaknya: "", namaBarang: "", harga: "", jumlah: 0 });
  }

  const sisa = grandTotal - uangMuka;
  const isLunas = grandTotal > 0 && sisa <= 0;

  // ── Shared styles ──────────────────────────────────────────────────────────
  const tdBase: React.CSSProperties = {
    border: "1px solid #000",
    padding: "6px 8px",
    fontSize: "10pt",
    lineHeight: "1.2",
    verticalAlign: "middle",
    height: "26px",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };

  const thBase: React.CSSProperties = {
    ...tdBase,
    fontWeight: "normal",
    textAlign: "center",
    height: "36px",
  };

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif", // Classic sans-serif look
        color: "#000",
        background: "#fff",
        width: "148mm", // A5 width
        minHeight: "210mm", // A5 height
        padding: "10mm 10mm",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Outer wrapper without the black border */}
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "5mm",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
          {/* Left Side: Store Info */}
          <div style={{ textAlign: "center", paddingTop: "10px" }}>
            <div style={{ fontWeight: "bold", fontSize: "14pt", letterSpacing: "1px" }}>PT. SURYA ELEKTRONIK BARU</div>
            <div style={{ fontSize: "10pt" }}>JUAL BELI BARANG ELEKTRONIK</div>
            <div style={{ fontSize: "9pt", fontWeight: "bold", marginTop: "2px" }}>
              Jl. Teknologi No. 8, Blok C<br />Jakarta Selatan
            </div>
          </div>

          {/* Right Side: Date and Customer */}
          <div style={{ fontSize: "10pt", width: "65mm" }}>
            
            {/* Tgl Pemesan */}
            <div style={{ display: "flex", alignItems: "flex-end", marginBottom: "5px" }}>
              <span style={{ width: "30px", paddingBottom: "2px" }}>Tgl.</span>
              <div style={{ borderBottom: "1px dotted #000", flex: 1, paddingLeft: "4px", paddingBottom: "2px" }}>{tanggal}</div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", marginBottom: "5px" }}>
              <span style={{ width: "60px", paddingBottom: "2px" }}>Pemesan</span>
              <div style={{ borderBottom: "1px dotted #000", flex: 1, paddingLeft: "4px", paddingBottom: "2px" }}>{kepada}</div>
            </div>

            {/* Alamat */}
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <span style={{ width: "45px", paddingBottom: "2px" }}>Alamat</span>
              <div style={{ borderBottom: "1px dotted #000", flex: 1, paddingLeft: "4px", paddingBottom: "2px" }}>{alamat}</div>
            </div>
          </div>
        </div>

        {/* ══ TITLE ═══════════════════════════════════════════════════════════ */}
        <div style={{ fontWeight: "bold", fontSize: "12pt", marginBottom: "2px", marginTop: "10px" }}>
          NOTA KONTAN {notaNo ? `No. ${notaNo}` : ""}
        </div>
        <div style={{ borderBottom: "2px solid #000", marginBottom: "1px" }}></div>
        <div style={{ borderBottom: "1px solid #000", marginBottom: "8px" }}></div>

        {/* ══ TABLE ═══════════════════════════════════════════════════════════ */}
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            tableLayout: "fixed",
            border: "1px solid #000"
          }}
        >
          <colgroup>
            <col style={{ width: "15%" }} />
            <col style={{ width: "45%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr>
              <th style={thBase}>Banyak<br/>nya</th>
              <th style={thBase}>NAMA BARANG</th>
              <th style={thBase}>HARGA</th>
              <th style={thBase}>JUMLAH</th>
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
                <td style={{ ...tdBase, textAlign: "center" }}>
                  {fmtHarga(row.harga)}
                </td>
                <td style={{ ...tdBase, textAlign: "center" }}>
                  {row.jumlah > 0 ? fmtNum(row.jumlah) : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ══ FOOTER & TOTALS ══════════════════════════════════════════════════ */}
        <div style={{ display: "flex", marginTop: "0" }}>
          {/* Left section: Tanda Terima & Perhatian */}
          <div style={{ flex: 1, position: "relative", paddingTop: "5px" }}>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <span style={{ fontSize: "10pt" }}>Penerima,</span>
              <div style={{ 
                border: "1px solid #000", 
                padding: "4px", 
                marginLeft: "10px", 
                fontSize: "8pt", 
                width: "45mm",
                lineHeight: "1.2"
              }}>
                <b>PERHATIAN :</b><br/>
                Barang yang sudah dibeli tidak dapat ditukar atau dikembalikan kecuali ada perjanjian
              </div>
            </div>

            {/* Signature line for Penerima */}
            <div style={{ width: "40mm", borderBottom: "1px solid #000", marginTop: "40px" }} />

            {/* Custom "LUNAS" stamp */}
            {isLunas && (
              <img
                src="/stempel-lunas.png"
                alt="Lunas Stamp"
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "15px",
                  width: "240px",
                  height: "auto",
                  opacity: 0.85,
                  mixBlendMode: "multiply",
                  pointerEvents: "none",
                  transform: "rotate(-5deg)"
                }}
              />
            )}
          </div>

          {/* Right section: Totals Grid */}
          <div style={{ width: "55mm", borderLeft: "1px solid #000" }}>
            {/* Jumlah */}
            <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
              <div style={{ flex: 1, padding: "5px", fontSize: "10pt" }}>
                Jumlah &nbsp;&nbsp;&nbsp;&nbsp;Rp.
              </div>
              <div style={{ width: "28mm", borderLeft: "1px solid #000", padding: "5px", fontSize: "10pt", fontWeight: "bold", textAlign: "right" }}>
                {grandTotal > 0 ? fmtNum(grandTotal) : ""}
              </div>
            </div>
            
            {/* Uang Muka */}
            <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
              <div style={{ flex: 1, padding: "5px", fontSize: "10pt" }}>
                Uang Muka Rp.
              </div>
              <div style={{ width: "28mm", borderLeft: "1px solid #000", padding: "5px", fontSize: "10pt", textAlign: "right" }}>
                {uangMuka > 0 ? fmtNum(uangMuka) : ""}
              </div>
            </div>

            {/* Sisa / Kembali */}
            <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
              <div style={{ flex: 1, padding: "5px", fontSize: "10pt", letterSpacing: uangMuka > grandTotal ? "0px" : "2px" }}>
                {uangMuka > grandTotal ? "Kembali" : "S i s a"} &nbsp;&nbsp;&nbsp;&nbsp;Rp.
              </div>
              <div style={{ width: "28mm", borderLeft: "1px solid #000", padding: "5px", fontSize: "10pt", textAlign: "right" }}>
                {uangMuka > grandTotal 
                  ? fmtNum(uangMuka - grandTotal) 
                  : (sisa > 0 ? fmtNum(sisa) : (grandTotal > 0 && sisa <= 0 ? "0" : ""))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
