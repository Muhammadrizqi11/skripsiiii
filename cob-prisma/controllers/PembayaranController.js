// Import model Pembayaran dan dependencies yang diperlukan
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mendapatkan semua pembayaran
export const getPembayaran = async (req, res) => {
  try {
    const pembayaran = await prisma.pembayaran.findMany();
    res.json(pembayaran);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan pembayaran." });
  }
};

// Mendapatkan pembayaran berdasarkan ID
export const getPembayaranById = async (req, res) => {
  const { id } = req.params;
  try {
    const pembayaran = await prisma.pembayaran.findUnique({
      where: { id: parseInt(id) },
    });
    if (!pembayaran) {
      res.status(404).json({ error: "Pembayaran tidak ditemukan." });
    } else {
      res.json(pembayaran);
    }
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan pembayaran." });
  }
};

// Membuat pembayaran baru
export const createPembayaran = async (req, res) => {
  const { jumlah, metode, status, waktuBayar, pemesananId } = req.body;
  try {
    const newPembayaran = await prisma.pembayaran.create({
      data: {
        jumlah,
        metode,
        status,
        waktuBayar,
        pemesananId,
      },
    });
    res.status(201).json(newPembayaran);
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat pembayaran baru." });
  }
};

// Mengupdate pembayaran berdasarkan ID
export const updatePembayaran = async (req, res) => {
  const { id } = req.params;
  const { jumlah, metode, status, waktuBayar, pemesananId } = req.body;
  try {
    const updatedPembayaran = await prisma.pembayaran.update({
      where: { id: parseInt(id) },
      data: {
        jumlah,
        metode,
        status,
        waktuBayar,
        pemesananId,
      },
    });
    res.json(updatedPembayaran);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengupdate pembayaran." });
  }
};

// Menghapus pembayaran berdasarkan ID
export const deletePembayaran = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pembayaran.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Pembayaran berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus pembayaran." });
  }
};
