import { 
  S3Client, 
  PutObjectCommand, 
  DeleteObjectCommand,
  ListObjectsV2Command
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from "uuid";
import { config } from 'dotenv';

config();

/**
 * CONSTANT and variables
 */
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg'];

/**
 * Credentials
 */
const s3Client = new S3Client(
  {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  }
);

/**
 * APIs
 */

export const uploadFile = async (file) => {
  if (!file || !file.buffer || !file.originalname) {
    console.log(new Error('Invalid file provided'));
    return { error: new Error('Invalid file provided') };
  }

  const parts = file.originalname.split('.');
  const extension = (parts.length > 1) ? parts.pop() : '';
  const encrypted_key = `${uuidv4()}.${extension}`; 

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: encrypted_key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  const isImage = IMAGE_EXTENSIONS.includes(extension.toLowerCase());

  try {
    await s3Client.send(command);

    const baseUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com`;
    const fileUrl = `${baseUrl}/${encrypted_key}`;

    // console.log('Uploaded file URL:', fileUrl); // debugging

    return { error: null, key: encrypted_key, url: fileUrl, isImage: isImage };

  } catch (error) {
    console.log('Error uploading file:', error);
    return { error };
  }
};

export const deleteFile = async (key) => {
  try {
  
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
    return { error: null };
  } 
  catch (error) {
    console.error('Error deleting file:', error);
    return { error };
  };
};

export const listAllFiles = async () => {

  const command = new ListObjectsV2Command(
    { Bucket: process.env.AWS_S3_BUCKET_NAME }
  );

  try {
    let isTruncated = true;
    let marker = undefined;
    const allFiles = [];

    while (isTruncated) {

      const response = await s3Client.send(command);

      if (response.Contents) {
        allFiles.push(...response.Contents);
      }

      isTruncated = response.IsTruncated;
      marker = response.NextContinuationToken;
      
      if (isTruncated) {
        command.input.ContinuationToken = marker;
      }
  
    }

    return allFiles;
  } 
  catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
};

export const filterImages = (files) => {
  return files
      .filter((file) => {
          const extension = file.Key.split('.').pop().toLowerCase();
          return IMAGE_EXTENSIONS.includes(extension);
      })
      .map((file) => ({
          key: file.Key,
          url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${file.Key}`,
      }));
};