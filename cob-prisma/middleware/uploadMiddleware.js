import multer from "multer";

const storage = multer.memoryStorage();
const uploadSingle = multer({ storage: storage }).single("image");

export { uploadSingle };
