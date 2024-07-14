import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const AddStudios = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const saveStudio = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("description", description);

    try {
      await axios.post("http://localhost:5000/studio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Studio created successfully");
      onClose(); // Tutup modal setelah berhasil menyimpan
    } catch (error) {
      console.error("Error saving studio:", error);
      setError("Failed to save studio. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tambah Studio Baru</h2>
      <Form onSubmit={saveStudio}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formImage">
          <Form.Label>Gambar</Form.Label>
          <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
        </Form.Group>
        <Form.Group controlId="formName">
          <Form.Label>Nama Studio</Form.Label>
          <Form.Control type="text" placeholder="Nama Studio" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Alamat</Form.Label>
          <Form.Control type="text" placeholder="Alamat" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Harga</Form.Label>
          <Form.Control type="number" placeholder="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Simpan
        </Button>
      </Form>
    </div>
  );
};

export default AddStudios;
