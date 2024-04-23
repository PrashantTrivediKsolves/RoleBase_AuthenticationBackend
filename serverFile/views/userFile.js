// import  express from 'express';
// const routeruserFile = express.Router();

// // Handle file upload
// routeruserFile.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//       const { originalname, path } = req.file;
  
//       // Save file metadata to PostgreSQL using Sequelize
//       const newFile = await File.create({ name: originalname, path: path });
      
//       res.json(newFile);
//     } catch (err) {
//       console.error('Error uploading file:', err);
//       res.status(500).json({ message: 'File upload failed' });
//     }
//   });

//   export default routeruserFile;