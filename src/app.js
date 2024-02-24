import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import process from 'process';
import routes from './routes/index.js'
// import { joiValidationError } from './utils/error.handler.js';
import  verifyToken  from './utils/authorization.js';

const app = express();
dotenv.config()
app.use(bodyParser.json());
app.use(cors());
//const mongoDB = 'mongodb://127.0.0.1:27017/futsalbooking'
const mongoDB = 'mongodb+srv://thefutsalpro:PfjbS6IalZTpfo4O@cluster0.voo7tlv.mongodb.net/'

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${process.cwd()}/src/images`)
    },
    filename: (req, file, callback) => {
        callback(null, file?.originalname)
    }
})

const upload = multer({storage: storage})


// Validate jwt token
app.use(verifyToken)
app.use('/images', express.static(`${process.cwd()}/src/images`));
// app.get('/images/:id', (req, res, next) => {
//         const id = req.params.id
//         const url = `http://localhost:8000/src/images`
//   });
app.post('/upload', upload.single('file'), (req, res) => {
    const url = `${req?.file?.originalname}`
    res.json({success: true, message: 'file uploaded.', url: url})
});
app.use('/', routes)

// app.use([joiValidationError])

//mongodb connections

mongoose.connect(mongoDB, (err) => {
    if (err) {
        console.log(`unable to connect database: ${err}`)
    } else {
        console.log('mongoDB connected sucessfully')
    }
})


app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})  // express server start 