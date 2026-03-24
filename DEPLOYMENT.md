# Deployment Guide - Fazaya Website

## 🚀 Deploy ke GitHub dan Vercel

### Step 1: Buat Repository di GitHub

1. Buka https://github.com/new
2. Nama repository: `fazaya-website`
3. Pilih **Private** (recommended) atau Public
4. **JANGAN** centang "Add README", ".gitignore", atau license
5. Klik **Create repository**

### Step 2: Push Code ke GitHub

Copy command dari GitHub, atau jalankan ini (ganti `USERNAME-GITHUB` dengan username GitHub kamu):

```bash
git remote add origin https://github.com/USERNAME-GITHUB/fazaya-website.git
git branch -M master
git push -u origin master
```

### Step 3: Deploy ke Vercel

1. Buka https://vercel.com/dashboard
2. Login dengan akun GitHub
3. Klik **"Add New Project"**
4. Pilih repository `fazaya-website`
5. Klik **"Import"**

### Step 4: Setting Environment Variables (PENTING!)

Di halaman "Configure Project" di Vercel:

1. Klik **"Environment Variables"**
2. Tambahkan variables berikut:

| Name | Value | Contoh |
|------|-------|--------|
| `ADMIN_PASSWORD` | Password untuk login admin | `fazaya2026secure` |
| `JWT_SECRET` | Random secret key | `super-secret-key-change-this-abc123xyz` |
| `UPLOADTHING_SECRET` | API key dari Uploadthing | `sk_test_xxx...` |
| `UPLOADTHING_APP_ID` | App ID dari Uploadthing | `your-app-id` |

**Cara mendapatkan Uploadthing keys:**
1. Buka https://uploadthing.com/dashboard
2. Login/signup dengan GitHub
3. Buat project baru
4. Copy **API Key** dan **App ID** ke environment variables

3. Klik **"Deploy"**

### Step 5: Akses Admin Panel

Setelah deploy selesai:

- **Website URL**: `https://fazaya-website.vercel.app`
- **Admin Login**: `https://fazaya-website.vercel.app/admin/login`
- **Password**: Sesuai `ADMIN_PASSWORD` yang kamu set di Step 4

---

## 🔒 Keamanan

### File yang TIDAK di-upload ke GitHub

File berikut sudah ada di `.gitignore` dan AMAN:
- `.env.local` - Tidak ter-upload ke GitHub
- `node_modules/` - Folder dependencies
- `.next/` - Build folder

### Environment Variables di Vercel

Setelah deploy, kamu bisa update environment variables di:
1. Buka project di Vercel Dashboard
2. Klik **"Settings"** → **"Environment Variables"**
3. Edit `ADMIN_PASSWORD` atau `JWT_SECRET` sesuai kebutuhan
4. Klik **"Redeploy"** untuk menerapkan perubahan

---

## 📝 Update Konten Admin Panel

Setelah website online, kamu bisa:

1. Login ke `/admin/login` dengan password yang sudah diset
2. Manage Products: Add, Edit, Delete
3. Manage Collections: Add, Edit, Delete
4. **Upload gambar** langsung dari dashboard (disimpan di cloud dengan Uploadthing)

### Upload Gambar

Dengan Uploadthing, kamu bisa:
- Upload gambar dari komputer
- Upload foto langsung dari camera HP
- Gambar tersimpan permanen di cloud
- Tidak perlu hosting file terpisah

---

## 🔄 Update Code di Masa Depan

Jika ada perubahan code:

```bash
git add -A
git commit -m "Update description"
git push
```

Vercel akan auto-deploy setiap ada push ke GitHub.

---

## 🆘 Troubleshooting

### Admin tidak bisa login setelah deploy
- Pastikan `ADMIN_PASSWORD` sudah diset di Vercel Environment Variables
- Redeploy project setelah set environment variable

### Gambar tidak muncul
- Cek apakah file ada di folder `public/uploads/`
- Pastikan path gambar benar (dimulai dengan `/uploads/...`)

### Build failed di Vercel
- Cek "Deployments" di Vercel Dashboard untuk lihat error
- Pastikan semua dependencies ada di `package.json`

---

**Contact**: Arkan Fajri
**Date**: 2026-03-24
