import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import multer from "multer";
import { uploadSingle } from "../middleware/uploadMiddleware.js"; // Import middleware
import path from "path";

// Konfigurasi penyimpanan gambar menggunakan multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

export const getStudio = async (req, res) => {
  try {
    const studios = await prisma.studio.findMany();
    res.status(200).json(studios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getStudioById = async (req, res) => {
  const { id } = req.params;
  try {
    const studio = await prisma.studio.findUnique({
      where: { id: parseInt(id) },
    });
    if (!studio) {
      return res.status(404).json({ error: "Studio not found" });
    }
    res.status(200).json(studio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createStudio = (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Error uploading file." });
    } else if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const { name, address, price, description } = req.body;
    const image = req.file.buffer; // Ambil data gambar dari req.file.buffer

    // Konversi price dari string ke float
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedPrice)) {
      return res.status(400).json({ error: "Invalid price value" });
    }

    try {
      await prisma.studio.create({
        data: {
          name,
          address,
          price: parsedPrice,
          description,
          image, // Simpan data gambar ke dalam kolom image
        },
      });
      res.status(201).json({ msg: "Studio Created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

export const updateStudio = (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Error uploading file." });
    } else if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const { id } = req.params;
    const { name, address, price, description } = req.body;
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedPrice)) {
      return res.status(400).json({ error: "Invalid price value" });
    }

    const studioData = {
      name,
      address,
      price: parsedPrice,
      description,
    };

    if (req.file) {
      studioData.image = req.file.buffer; // Handle image file
    }

    try {
      await prisma.studio.update({
        where: { id: parseInt(id) },
        data: studioData,
      });
      res.status(200).json({ msg: "Studio Updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

export const deleteStudio = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.studio.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ msg: "Studio Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
