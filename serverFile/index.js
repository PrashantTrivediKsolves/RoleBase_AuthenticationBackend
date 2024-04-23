import { connectionUser } from "./postgres/user.js";

import { connectionUserFile } from "./postgres/userFile.js";

import { connectionblog } from "./postgres/blog.js";

import { connectionpendingblog} from "./postgres/pendingBlog.js";

// import { connectionNewBlog } from "./postgres/newBlogModels.js";

import express from 'express';

import cors from 'cors';
import multer from 'multer';

import path from 'path';
import cookieParser from 'cookie-parser';

import bodyParser from 'body-parser';

import routeruser from './views/user.js'
import {checkRole} from './middlewares/jwt.js'
import routerblog from "./views/blog.js";
import routerpendingblog from "./views/pendingBlog.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

import { newuserModelFile } from './postgres/userFile.js';

const app=express();

app.use(cors({
    origin:"*"
}));

// Set up Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// storage engine

// const storage=multer.diskStorage(
//     {
//         destination:"./upload/images",
//         filename:(req,file,cb)=>
//         {
//             return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//         }
//     }
// )
// const upload=multer(
//     {
//         // dest:'./upload/images',
//         storage:storage,
//         // limits:{fileSize:10}
//     }
// )
// app.use('/profile',express.static('upload/images'));
// app.post("/upload",upload.single('file'),async (req,res)=>
// {
//     // console.log(req.file);
//     // res.json({
//     //     succes:1,
//     //     profile_url:`http://localhost:8000/profile/${req.file.filename}`
//     // })
//     try {
//         const { originalname, path } = req.file;

//         // Save file metadata to PostgreSQL using Sequelize
//         const newFile = await newuserModelFile.create({ name: originalname, path: path });
        
//         res.json(newFile);
//       } catch (err) {
//         console.error('Error uploading file:', err);
//         res.status(500).json({ message: 'File upload failed' });
//       }
// })
// Assuming multer and sequelize are properly configured and imported

// Handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const { originalname, path } = req.file;

    // Create a new record in the 'files' table using Sequelize
    const newFile = await newuserModelFile.create({ name: originalname, path: path });

    res.json(newFile);
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ message: 'File upload failed' });
  }
});

app.get('/uploads', async (req, res) => {
  try {
    const files = await newuserModelFile.findAll();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Failed to fetch files' });
  }
});

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(routeruser);

app.use(routerblog);

app.use(routerpendingblog);

const PORT=8000;
app.get('/api/admin', checkRole('admin'), (req, res) => {
    res.json({ message: 'You have admin access' });
});

function errHandler(err,rq,res,next)
{
    if(err instanceof multer.MulterError)
    {
        res.json({
            succes:0,
            message:err.message
        })
    }
}
app.use(errHandler);
app.listen(PORT,()=>
{
    console.log(`server is running at port ${PORT}`);
})

connectionUser();

connectionUserFile();

connectionblog();

connectionpendingblog();

// connectionNewBlog();

