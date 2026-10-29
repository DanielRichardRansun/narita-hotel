# Design System & Style Guide: The Damai Aesthetic
**Inspirasi & Panduan Desain: Warm Organic Luxury & Editorial Minimalism**

Dokumen ini adalah cetak biru (*blueprint*) desain sistem menyeluruh yang diangkat dari arsitektur visual `thedamai.com` (karya Dennis Snellenberg, Christy Lammerink, Tom de Koning). Gunakan dokumen ini sebagai acuan standar setiap kali membangun website dengan nuansa, tema, dan estetika serupa (resort mewah tersembunyi, *boutique hotel*, retret kesehatan, spa premium, atau *luxury editorial brand*).

---

## 1. Filosofi & Esensi Desain

- **Konsep Inti**: *"Secluded Luxury in Elegant Simplicity"* — Kemewahan yang tenang, tidak bising (*quiet luxury*), bersahaja, hangat, dan berakar pada alam serta budaya lokal tanpa terkesan kuno.
- **Karakter Visual**:
  - **Editorial & Tactile**: Terasa seperti membuka majalah arsitektur dan gaya hidup kelas atas.
  - **Lapang & Bernapas (*Generous Whitespace*)**: Ruang kosong yang luas memberi kesan hening, santai, dan eksklusif.
  - **Garis Ramping (*Hairline Borders*)**: Garis pembatas tipis (`1px` dengan opasitas rendah) yang memberikan struktur presisi arsitektural.
  - **Bentuk Organik & Pill**: Elemen interaktif (tombol, chip, tag) menggunakan sudut bulat penuh (*pill-shaped* `border-radius: 100em`).
  - **Ornamen Geometris Tradisional Kontemporer**: Simbol bunga / mandala bersudut 8 (*Balinese floral star*) yang diinterpretasikan secara geometris minimalis modern.

---

## 2. Palet Warna (Color Tokens)

Sistem warna memadukan nuansa bumi (*earth tones*), batu hangat (*stone*), pasir alami (*warm linen*), terakota senja (*sunset orange rust*), dan hijau hutan tropis (*butterfly teal/spruce*).

### 2.1 Nilai Token Warna CSS

```css
:root {
  /* Base RGB Channels */
  --color-dark-rgb: 50, 32, 24;       /* Deep Espresso Brown #322018 */
  --color-light-rgb: 234, 229, 223;   /* Warm Sand / Warm Linen #EAE5DF */
  --color-white-rgb: 248, 246, 244;   /* Soft Off-White / Alabaster #F8F6F4 */
  --color-black-rgb: 0, 0, 0;

  /* Solid Colors */
  --color-dark: rgba(var(--color-dark-rgb), 1);       /* #322018 - Teks utama & tema gelap */
  --color-light: rgba(var(--color-light-rgb), 1);     /* #EAE5DF - Background utama website */
  --color-white: rgba(var(--color-white-rgb), 1);     /* #F8F6F4 - Kontras terang / card light */
  --color-black: rgba(var(--color-black-rgb), 1);

  /* Brand Accents */
  --color-primary: #903C02;           /* Sunset Terracotta / Rust Red-Orange */
  --color-secondary: #0A6365;         /* Deep Tropical Teal / Butterfly Green 700 */
  --color-lightgray: #E0D9D1;         /* Muted Warm Stone / Border Soft */

  /* Nuance Tone Scale */
  --color-stone-50: var(--color-light);
  --color-stone-100: var(--color-lightgray);
  --color-stone-200: #CEC3B6;
  --color-stone-900: var(--color-dark);

  --color-butterflygreen-500: #2CA09E; /* Teal Terang / Ikon highlight */
  --color-butterflygreen-700: var(--color-secondary); /* #0A6365 */
  --color-butterflygreen-900: #00383C; /* Spruce Dark Teal (Tombol Utama) */
  --color-sunsetorange-800: var(--color-primary); /* #903C02 */

  /* Glassmorphism & Borders */
  --color-blur: rgba(210, 205, 200, 0.3);
  --color-border: rgba(var(--color-dark-rgb), 0.15);
  --color-border-light: rgba(var(--color-white-rgb), 0.175);
  --color-border-active: rgba(var(--color-dark-rgb), 0.25);
  --color-border-active-light: rgba(var(--color-white-rgb), 0.275);

  /* Typography Colors */
  --color-text: rgba(var(--color-dark-rgb), 0.9);
  --color-text-light: rgba(var(--color-white-rgb), 0.9);

  /* Status */
  --color-alert-error: #FF213E;
  --color-alert-success: #46D054;
}

/* Dark Section Mode */
[data-theme-section="dark"] {
  --color-border: rgba(var(--color-light-rgb), 0.15);
  --color-text: rgba(var(--color-white-rgb), 0.9);
}
```

### 2.2 Panduan Penggunaan Warna
1. **Background**: Jangan pernah menggunakan `#FFFFFF` polos. Gunakan `--color-light` (`#EAE5DF`) untuk halaman default, dan `--color-dark` (`#322018`) untuk section berkesan intim/malam.
2. **Teks**: Gunakan `--color-dark` dengan opasitas `0.9` (`--color-text`). Hindari warna hitam pekat `#000000` pada teks agar tetap hangat.
3. **Aksen Interaktif**:
   - Tombol utama / Call-To-Action: Hijau spruce gelap (`--color-butterflygreen-900` / `#00383C`) dengan teks putih dan ikon toska (`#2CA09E`).
   - Tombol sekunder / Aksen rust: Terracotta (`--color-primary` / `#903C02`).
   - Eyebrow / Label kecil: Aksen sekunder atau `--color-dark` dengan opasitas `40%`.

---

## 3. Sistem Tipografi (Typography)

Menggunakan kontras antara **Serif Klasik-Modern yang Anggun** untuk Judul dan **Sans-Serif Humanis/Geometris yang Bersih** untuk Body Text.

### 3.1 Font Families
- **Display / Heading Font**: `'Kaftan Serif'` (Alternatif gratis/Google Fonts: *Cormorant Garamond*, *Cinzel*, *Playfair Display*, atau *Canela*).
- **Body & Interface Font**: `'ABC Whyte'` (Weight: Light 300, Regular 400). (Alternatif gratis/Google Fonts: *Plus Jakarta Sans*, *Outfit*, *Inter*, atau *DM Sans*).

### 3.2 Rumus Skala Ukuran Fluid (`clamp()`)
Basis ukuran dinamis ditentukan oleh `--title-size`:
```css
:root {
  --title-size: clamp(5em, 7.5vw, 7.5em);

  --copy-size-l: 0.9em;    /* Paragraf Utama (~15-17px) */
  --copy-size-m: 0.8em;    /* Tombol & Label Menu (~13-15px) */
  --copy-size-s: 0.725em;  /* Meta data & Eyebrow (~11-13px) */
}

body {
  font-family: 'ABC Whyte', 'Plus Jakarta Sans', sans-serif;
  font-weight: 300;
  font-size: clamp(16px, 1.2vw, 19px);
  line-height: 1.5;
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}
```

### 3.3 Skala Hirarki Heading & Teks
| Elemen | Font Family | Weight | Ukuran Kalkulasi | Line Height | Keterangan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `h1`, `h2.big` | Kaftan Serif | 400 | `calc(var(--title-size) * 0.775)` | 1.2 | Hero title, statement utama |
| `h2` | Kaftan Serif | 400 | `calc(var(--title-size) * 0.55)` | 1.2 | Judul section besar |
| `h3` | Kaftan Serif | 400 | `calc(var(--title-size) * 0.4)` | 1.2 | Judul card / sub-section |
| `h3.small` | Kaftan Serif | 400 | `calc(var(--title-size) * 0.325)` | 1.2 | Judul card kecil / paket |
| `h4` | Kaftan Serif | 400 | `calc(var(--title-size) * 0.275)` | 1.2 | Header dialog / modal |
| `h5` | ABC Whyte | 400 | `calc(var(--title-size) * 0.2)` | 1.0 | Sub-label |
| `.eyebrow` | ABC Whyte | 400 | `0.725em` (Huruf Kapital) | 1.0 | Letter-spacing: `calc(0.75em * 0.12)`, warna aksen/redup |
| `p` (Body) | ABC Whyte | 300 | `var(--copy-size-l)` | 1.5 | Paragraf narasi deskriptif |
| `p.medium` | ABC Whyte | 300 | `var(--copy-size-m)` | 1.4 | Paragraf ringkas / alamat |
| `p.small` | ABC Whyte | 300 | `var(--copy-size-s)` | 1.3 | Catatan kaki / caption |

---

## 4. Spacing, Layout & Grid System

Semua tata ruang terikat dengan rasio matematis yang proporsional terhadap ukuran layar:

```css
:root {
  --gap: calc(var(--title-size) * 0.3);                 /* Spasi antar elemen teks/tombol */
  --section-padding: calc(var(--title-size) * 1.2);    /* Padding atas-bawah section */
  --container-padding: calc(var(--gap) * 1.5);         /* Padding kiri-kanan container desktop */
  --border-radius: 100em;                              /* Kapsul / Pill radius */
  --btn-height: 3em;                                   /* Tinggi tombol standar */
  --btn-height-small: 2.625em;                         /* Tinggi tombol compact */
  --nav-bar-height: calc(var(--btn-height) + (var(--gap) * 2));
}

@media screen and (max-width: 1024px) {
  :root {
    --container-padding: var(--gap);
  }
}

@media screen and (max-width: 540px) {
  :root {
    --container-padding: clamp(1.25em, 4vw, 2.5em);
    --card-width: calc(var(--title-size) * 1.75);
  }
}
```

### Tipe Container
- `.container`: Maksimal `calc(var(--title-size) * 11)` — untuk konten artikel & hero seimbang.
- `.container.wide`: `max-width: 100%` — untuk strip promosi / gallery penuh.
- `.container.medium`: `max-width: calc(var(--title-size) * 9)`.
- `.container.small`: `max-width: calc(var(--title-size) * 7.75)`.
- `.container.full`: `max-width: 100vw; padding: 0;` — untuk footer atau full-bleed split.

### Hairline Borders
Gunakan garis pembatas tipis berstruktur presisi:
- Garis horizontal: `.border-top`, `.border-bottom` dengan `height: 1px; background-color: var(--color-border);`
- Garis vertikal: `.border-left`, `.border-right` dengan `width: 1px; background-color: var(--color-border);`

---

## 5. Komponen Utama (Component Design)

### 5.1 Floating Header & Navigation
- **Struktur**:
  - `header`: `position: fixed; top: 0; left: 0; right: 0; z-index: 200; pointer-events: none;`
  - `.main-nav-bar`: Wadah horizontal mengambang dengan latar belakang kaca transparan (`backdrop-filter: blur(12px)` saat di-scroll) dan garis pembatas bawah `1px`.
  - **Sisi Kiri**: Logo wordmark berbasis SVG minimalis.
  - **Tengah/Kanan**:
    - Tombol Hamburger (*Cheeseburger icon* 3 baris tipis) untuk drawer navigasi penuh.
    - Menu link horizontal desktop yang bersih dengan efek garis bawah animasi.
    - Tombol aksi primer ("Book your stay") berbentuk kapsul (*pill*).

### 5.2 Pill Buttons (`.btn`)
Tombol menggunakan bentuk kapsul sempurna dengan animasi *roll-up text* yang sangat khas:

#### Struktur HTML Tombol:
```html
<div class="btn secondary small">
  <a href="#link" class="btn-click">
    <div class="btn-content">
      <!-- Ornamen SVG Kiri (Opsional) -->
      <svg class="btn-icon" width="20" height="20" viewBox="0 0 64 64">...</svg>
      <!-- Label Teks -->
      <span>Explore our villas</span>
      <!-- Ornamen SVG Kanan (Opsional) -->
      <svg class="btn-icon" width="20" height="20" viewBox="0 0 64 64">...</svg>
    </div>
  </a>
</div>
```

#### Varian Tombol:
1. **`.btn.secondary` (Primary Brand CTA)**: Background `--color-butterflygreen-900` (`#00383C`), teks `--color-white`, ikon warna toska `--color-butterflygreen-500` (`#2CA09E`).
2. **`.btn` (Standard Accent)**: Background `--color-primary` (`#903C02` terracotta).
3. **`.btn.blur` (Glassmorphic Card Button)**: `background-color: rgba(var(--color-white-rgb), 0.2); backdrop-filter: blur(1em);` — sempurna untuk diletakkan di atas gambar/foto.
4. **`.btn.outline`**: Transparan dengan border `1px solid var(--color-border)`.

#### Efek Interaksi Tombol (Signature Roll-Up Effect):
Pada kondisi `:hover`, teks bergeser ke atas dan muncul bayangan teks baru dari bawah (menggunakan teknik `text-shadow` dan `translateY`), sementara ornamen ikon SVG berputar `90deg`:
```css
.btn .btn-content span {
  transition: all var(--animation-smooth);
  text-shadow: 0px calc(var(--btn-shadow-distance) * 1.5) transparent;
}

.btn .btn-click:hover .btn-content span {
  transform: translateY(calc(var(--btn-shadow-distance) * -1));
  color: transparent;
  text-shadow: 0px var(--btn-shadow-distance) var(--color-white);
}

.btn .btn-click:hover svg:nth-of-type(1) { transform: rotate(90deg); }
.btn .btn-click:hover svg:nth-of-type(2) { transform: rotate(-90deg); }
```

### 5.3 Kartu Produk / Stay Card (`.single-stay-card`)
- **Rasio Gambar**: Rasio vertikal editorial (3:4 atau 4:5).
- **Efek Hover Gambar Ganda**:
  - Terdapat dua layer gambar: foto utama dan foto kedua (`.overlay-hover`).
  - Saat card di-hover, foto kedua memudar masuk (*fade in*) halus memberikan preview interior yang berbeda.
- **Center Floating Ornament**: Ornamen floral star melayang di tengah gambar dengan warna putih tipis.
- **Informasi di Bawah**:
  - Title: Heading serif `<h3>Garden Villa</h3>`.
  - Deskripsi: Paragraf abu-abu tipis `Sleeps 2 adults — with a small veranda...` dipisahkan dengan tanda en-dash (`—`).

### 5.4 Kartu Paket / Promo Card (`.single-packages-card`)
- Format poster vertikal dengan background foto penuh.
- Lapisan gradien gelap halus (`radial-gradient` atau `linear-gradient`) untuk memastikan keterbacaan teks.
- Eyebrow promo di atas: `2 nights or more - save over 15%`.
- Judul paket serif `Damai Romance`.
- Tombol `.btn.blur.small` ("More info") menempel rapi di bagian bawah kartu.

### 5.5 Indikator Tiga Titik & Icon Link (`.dots`, `.icon-link`)
- Tiga titik horizontal kecil (diameter `3px`, warna `--color-dark` opasitas `0.8`).
- Digunakan di samping label dropdown navigasi dan di samping tautan "Overview" / "Show more".
- Memberi nuansa *refined editorial indexing*.

### 5.6 Drawer Layar Penuh (Side Navigation & Modals)
- Menggunakan trigger overlay gelap bergradien halus (`.overlay.overlay-dark`).
- **Side Nav Images**: Pada desktop, ketika user mengarahkan kursor ke item menu tertentu ("Stay", "Dining", "Relax"), gambar latar belakang di sisi samping berganti secara dinamis mencerminkan kategori tersebut.
- Tombol Close: Simbol dua garis silang minimalis (`.close > .close-inner > .bar * 2`).

### 5.7 Footer Arsitektural Presisi
- Dibagi menjadi kolom modular dengan garis vertikal pemisah (`.border-left`).
- Integrasi review otentik (seperti rating TripAdvisor bintang 5.0 / 1300+ reviews).
- Bagian bawah memuat Copyright dan link Credits desainer/pengembang.

---

## 6. Ornamen & Elemen Grafis Khas

Website ini menggunakan ornamen khas **Balinese Floral Star Geometry** yang dibuat dalam format vektor SVG:

```html
<!-- Mini Balinese Geometric Flower SVG -->
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M32 0.019L32 12.981C30.77 11.42 30 9.1 30 6.5C30 3.9 30.77 1.58 32 0.02Z" fill="currentColor"/>
  <!-- Pola simetris 8 arah mata angin -->
</svg>
```

- **Garis Dekorasi Vertikal (`.deco-line-y`)**: Garis vertikal tipis `1px` setinggi `2.5em` s.d. `4em` yang menghubungkan antar-elemen (misal: antara hero text dan tombol jelajah).

---

## 7. Sistem Animasi & Interaksi (Motion Design)

### 7.1 Kurva Transisi (Easing Tokens)
Website ini mengandalkan kurva bezier custom untuk menghadirkan gerak yang sangat mulus dan berbobot:

```css
:root {
  --animation-fast: 0.4s cubic-bezier(0.3, 1, 0.3, 1);
  --animation-primary: 0.6s cubic-bezier(0.3, 1, 0.3, 1);
  --animation-smooth: 0.8s cubic-bezier(0.3, 1, 0.3, 1);
  --animation-slow: 0.8s cubic-bezier(0.6, 0, 0.2, 1);
  --animation-slider: 1.2s cubic-bezier(0.6, 0, 0.2, 1);
  --animation-nav: 0.4s cubic-bezier(0.3, 0, 0.3, 1);
}
```

### 7.2 Library Ekosistem
Jika membangun website dinamis dengan stack ini:
1. **Lenis Scroll**: Untuk *inertia/smooth scrolling* tanpa lag.
2. **GSAP + ScrollTrigger**: Untuk animasi parallax gambar dan reveal teks saat di-scroll.
3. **Barba.js**: Untuk transisi halaman mulus tanpa *hard refresh* browser.
4. **Vanilla LazyLoad**: Memuat gambar WebP resolusi rendah terlebih dahulu (*blur up*), kemudian gambar HD saat masuk viewport.

### 7.3 Kursor Khusus (*Interactive Cursor Bubble*)
- Elemen lingkaran kecil semi-transparan yang mengikuti posisi mouse (*lerp smoothing*).
- Ketika melayang di atas card villa atau slider foto, kursor membesar dan menampilkan teks aksi: `"View"`, `"Drag"`, atau `"Explore"`.

---

## 8. Panduan Fotografi & Visual Assets

- **Pencahayaan**: *Natural daylight*, *golden hour*, bayangan dedaunan tropis yang lembut (*dappled sunlight*).
- **Komposisi**:
  - Jangan gunakan foto stok generik.
  - Tampilkan detail arsitektur lokal (kayu jati, ukiran batu, kain tenun, air kolam tenang, dedaunan hijau lebat).
  - Foto candid aktivitas yang santai (menikmati sarapan, membaca buku, spa, pemandangan laut kejauhan).
- **Format**: Selalu sajikan dalam format `.webp` yang dikompresi dengan rasio tajam.

---

## 9. Template Awal Cepat (Boilerplate HTML & CSS)

Gunakan kerangka dasar berikut saat memulai proyek baru dengan tema ini:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Nama Project | Luxury Retreat</title>
  
  <!-- Font Rekomendasi (Alternatif Google Fonts yang Serupa) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap" rel="stylesheet">

  <style>
    :root {
      --color-dark: #322018;
      --color-light: #EAE5DF;
      --color-white: #F8F6F4;
      --color-primary: #903C02;
      --color-secondary: #0A6365;
      --color-spruce: #00383C;
      --color-teal-accent: #2CA09E;
      --color-border: rgba(50, 32, 24, 0.15);
      --color-text: rgba(50, 32, 24, 0.9);
      
      --title-size: clamp(4.5em, 7vw, 7em);
      --section-padding: calc(var(--title-size) * 1.1);
      --container-padding: clamp(1.5em, 5vw, 4em);
      --border-radius: 100em;
      --animation-smooth: 0.6s cubic-bezier(0.3, 1, 0.3, 1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--color-light);
      color: var(--color-text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 300;
      font-size: clamp(16px, 1.1vw, 18px);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4 {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 400;
      line-height: 1.2;
      color: var(--color-dark);
    }

    h1 { font-size: calc(var(--title-size) * 0.75); }
    h2 { font-size: calc(var(--title-size) * 0.52); }
    h3 { font-size: calc(var(--title-size) * 0.38); }

    .eyebrow {
      display: inline-block;
      text-transform: uppercase;
      font-size: 0.725em;
      letter-spacing: 0.12em;
      color: var(--color-secondary);
      font-weight: 500;
      margin-bottom: 0.5em;
    }

    .container {
      max-width: 1300px;
      margin: 0 auto;
      padding: 0 var(--container-padding);
    }

    .section {
      padding: var(--section-padding) 0;
      position: relative;
    }

    /* Pill Button */
    .btn-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 3em;
      padding: 0 1.8em;
      border-radius: var(--border-radius);
      background-color: var(--color-spruce);
      color: var(--color-white);
      text-decoration: none;
      font-size: 0.85em;
      letter-spacing: 0.02em;
      transition: background-color var(--animation-smooth), transform var(--animation-smooth);
    }

    .btn-pill:hover {
      background-color: var(--color-primary);
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <header style="padding: 2em var(--container-padding); display: flex; justify-content: space-between; align-items: center;">
    <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.5em; font-weight: 500; letter-spacing: 0.05em; color: var(--color-dark);">
      BRAND RESORT
    </div>
    <a href="#book" class="btn-pill">Book your stay</a>
  </header>

  <main>
    <section class="section" style="text-align: center;">
      <div class="container">
        <span class="eyebrow">A Hidden Sanctuary</span>
        <h1>Find Serenity in Nature</h1>
        <p style="max-width: 32em; margin: 1.5em auto 2.5em; font-size: 0.95em;">
          With all the luxuries that matter, and none that don't. Surrounded by lush gardens and decorated in authentic personal style.
        </p>
        <a href="#explore" class="btn-pill">Explore Our Villas</a>
      </div>
    </section>
  </main>
</body>
</html>
```

---

## 10. Checklist Kunci Saat Membangun Website Baru Bertema Ini

- [ ] Apakah warna latar belakang menggunakan krem lembut (`#EAE5DF`) dan bukan putih polos?
- [ ] Apakah font heading memakai serif elegan (`Kaftan Serif` / `Cormorant Garamond`) dengan line-height rapat (`1.2`)?
- [ ] Apakah font body memakai sans-serif berbobot ringan (*light* `300`)?
- [ ] Apakah ada label `.eyebrow` kapital berspasi longgar di atas judul?
- [ ] Apakah tombol berbentuk kapsul (*pill shape* `border-radius: 100em`) dengan transisi halus?
- [ ] Apakah garis batas (*borders*) setipis `1px` dengan opasitas rendah (`0.15`)?
- [ ] Apakah gambar menampilkan nuansa alam, hangat, dan memiliki rasio vertikal majalah (*editorial portrait*)?
- [ ] Apakah scroll terasa mulus dan transisi elemen terasa berbobot (*smooth easing*)?
