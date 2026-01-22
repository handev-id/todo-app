# Todo App (FE & BE)

Aplikasi Todo sederhana dengan:

- Frontend: React
- Backend: NestJS
- Database: PostgreSQL
- Node Js 20

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Setup Backend Environment

Masuk ke folder backend:

```bash
cd backend
```

Copy file environment:

```bash
cp .env.example .env
```

Sesuaikan konfigurasi PostgreSQL lokal di file .env.

### 2. Jalankan Fe & Be

Kembali ke root project dan jalankan:

```
chmod +x run-dev.sh
./run-dev.sh
```

Script ini akan:

- Menjalankan `npm install` jika dependency belum tersedia
- Menjalankan frontend (`npm run dev`)
- Menjalankan backend (`npm run start:dev`)

---

## 🛠️ Keputusan Teknis

- **Tidak menggunakan Docker**  
  Project ini dikerjakan dalam waktu terbatas untuk kebutuhan technical test. Fokus diarahkan pada implementasi fitur, struktur kode, dan alur aplikasi, sehingga setup Docker belum menjadi prioritas.

- **Script Bash untuk Development**  
  Menggunakan `run-dev.sh` untuk menjalankan frontend dan backend secara bersamaan, mengurangi langkah manual saat setup dan mempermudah proses review.
