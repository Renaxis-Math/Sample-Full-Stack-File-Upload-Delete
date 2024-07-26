import express from 'express';
import multer, { memoryStorage } from 'multer';
import { config } from 'dotenv';
import cors from 'cors';
import { 
  uploadFile, 
  deleteFile, 
  listAllFiles, 
  filterImages 
} from "./config/s3.js";

// CONSTANTS and Environment Variables
config();

const STATUS_BAD_REQUEST = Number(process.env.STATUS_BAD_REQUEST) || 400;
const STATUS_INTERNAL_SERVER_ERROR = Number(process.env.STATUS_INTERNAL_SERVER_ERROR) || 500;
const STATUS_OK = Number(process.env.STATUS_OK) || 200;

const allowedMethods = (process.env.ALLOWED_METHODS || '')
                        .split(',')
                        .map( method => method.trim() );
const allowedHeaders = (process.env.ALLOWED_HEADERS || '')
                        .split(',')
                        .map( method => method.trim() );

// PORT
const app = express();
const port = process.env.BACK_PORT || process.env.BACK_PORT + 1;

// Multer
const storage = memoryStorage();
const upload = multer({ storage });

/**
 * Main
 */

// Start the server
app.listen(
  port, 
  () => {
    console.log(`Server running on port ${port}`);
  }
);

// Enable CORS for the frontend
app.use(
  cors({
    origin: `${process.env.BASE_URL}:${process.env.FRONT_PORT}`,
    methods: allowedMethods,
    allowedHeaders: allowedHeaders
  })
);

// Upload File
app.post(
  '/', 
  upload.single('file'), 
  async (req, res) => {

    if (!req.file) {
      return res.status(STATUS_BAD_REQUEST).json({ message: 'No file uploaded.' });
    }

    const { error, key, url, isImage } = await uploadFile(req.file);
    if (error) {

      console.error('Error during file upload:', error);

      return res.status(STATUS_INTERNAL_SERVER_ERROR).json(
        { message: 'Failed to upload file.',
          error: error.message 
        }
      );
    }

    return res.status(STATUS_OK).json(
      {
        message: 'File uploaded successfully!',
        key,
        url,
        isImage
      }
    );
  }
);

// Delete File
app.delete(
    '/:key',
    async (req, res) => {
      const { key } = req.params;

      try {
        const { error } = await deleteFile(key);
        if (error) {

          console.error('Error during file deletion:', error);

          return res.status(STATUS_INTERNAL_SERVER_ERROR).json(
            { message: 'Failed to delete file.', 
              error: error.message 
            }
          );
        }

        return res.status(STATUS_OK).json({ message: 'File deleted successfully!' });
      } catch (err) {

        console.error('Error in delete endpoint:', err);

        return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Server error.', error: err.message });
      }
  }
);

// Delete All
app.delete('/', async (req, res) => {
  try {
    const files = await listAllFiles();

    const deletePromises = files.map(file => {
      deleteFile(file.Key);
    });

    await Promise.all(deletePromises);
    
    res.status(STATUS_OK).json({ message: 'All files deleted successfully.' });
  }
  catch (error) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete all files', error: error.message });
  }
})

// Fetch all files
app.get(
  '/', 
  async (req, res) => {
    try {
        const files = await listAllFiles();
        res.status(STATUS_OK).json({files: files, imageFiles: filterImages(files)});
    } 
    catch (err) {
        console.error('Error retrieving files from S3:', err);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve files.', error: err.message });
    }
  }
);
