import express, { Router } from 'express';
import axios from 'axios';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/upload', upload.single('file'), async function UploadDocument(req, res) {
    try {
        const formData = new FormData();
        const file = new Blob([req.file.buffer], { type: req.file.mimetype });
        formData.append("file", file, req.file.originalname);
        formData.append("fileName", req.body.fileName);

        console.log("\n");
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value); // 🔥 Hangi veriler gönderiliyor?
        }
        console.log("\n");

        const jwt = req.cookies.jwt;
        const response = (await axios.post(
            'http://localhost:6410/api/document/create', 
            formData, 
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${jwt}`,
                },
                withCredentials: true,
            }
    )).data;
        
        console.log(`\nresponse: ${JSON.stringify(response)}\n`);
        res.json(response);
    } catch (error) {
        console.error(`Error here --> ${error}`);
    }
});

export default router;