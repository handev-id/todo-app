#!/bin/bash

# stop kalau ada error
set -e

echo "===> Masuk ke frontend"
cd frontend

if [ ! -d "node_modules" ]; then
  echo "node_modules frontend belum ada, menjalankan npm install..."
  npm install
else
  echo "node_modules frontend sudah ada"
fi

echo "Menjalankan frontend (npm run dev)..."
npm run dev &

echo "===> Kembali ke root project"
cd ..

echo "===> Masuk ke backend"
cd backend

if [ ! -d "node_modules" ]; then
  echo "node_modules backend belum ada, menjalankan npm install..."
  npm install
else
  echo "node_modules backend sudah ada"
fi

echo "Menjalankan backend (npm run start:dev)..."
npm run start:dev
