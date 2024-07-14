import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPemesanan = async (req, res) => {
  const { totalHarga, tanggalMulai, tanggalSelesai, durasi, studioId, userId } = req.body;
  try {
    const pemesanan = await prisma.pemesanan.create({
      data: {
        totalHarga,
        tanggalMulai,
        tanggalSelesai,
        durasi,
        studioId,
        userId,
      },
    });
    res.json(pemesanan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPemesanan = async (req, res) => {
  try {
    const pemesanan = await prisma.pemesanan.findMany();
    res.json(pemesanan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPemesananById = async (req, res) => {
  const { id } = req.params;
  try {
    const pemesanan = await prisma.pemesanan.findUnique({ where: { id: parseInt(id) } });
    if (!pemesanan) return res.status(404).json({ msg: "Pemesanan tidak ditemukan" });
    res.json(pemesanan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePemesanan = async (req, res) => {
  const { id } = req.params;
  const { totalHarga, tanggalMulai, tanggalSelesai, durasi, studioId, userId } = req.body;
  try {
    const pemesanan = await prisma.pemesanan.update({
      where: { id: parseInt(id) },
      data: { totalHarga, tanggalMulai, tanggalSelesai, durasi, studioId, userId },
    });
    res.json(pemesanan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePemesanan = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pemesanan.delete({ where: { id: parseInt(id) } });
    res.json({ msg: "Pemesanan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
