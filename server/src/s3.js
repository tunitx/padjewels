import {
    S3Client,
    PutObjectCommand,
} from "@aws-sdk/client-s3";

import dotenv from "dotenv";

dotenv.config();

const bucketName = 'shukrabucket';
const region = 'ap-south-1';
const accessKeyId = 'AKIASZPZ4XOX6H5LEL4N';
const secretAccessKey = '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';

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

export function uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: 'product-images/uploaded-image.jpg',
        ContentType: mimetype,
    };
    console.log("File uploaded");

    return s3Client.send(new PutObjectCommand(uploadParams));
}