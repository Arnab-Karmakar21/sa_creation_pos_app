import AWS from 'aws-sdk';
import {environment} from '../environment';

const s3 = new AWS.S3({
  region: environment.S3_Crad.REGION,
  accessKeyId: environment.S3_Crad.ACCESS_KEY_ID,
  secretAccessKey: environment.S3_Crad.SECRET_ACCESS_KEY,
});

export const UploadImageService = async (
  folder: S3Folder,
  key: string,
  body: string,
) => {
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: environment.S3_Crad.S3_BUCKET_NAME,
        Key: folder + '/' + key,
        Body: body,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      },
    );
  });
};

export const RetrieveImageService = (folder: S3Folder, key?: string) => {
  return s3.getSignedUrl('getObject', {
    Bucket: environment.S3_Crad.S3_BUCKET_NAME,
    Key: folder + '/' + key,
  });
};

export const RetrieveImageService_one = (key?: string) => {
  return s3.getSignedUrl('getObject', {
    Bucket: environment.S3_Crad.S3_BUCKET_NAME,
    Key: key,
  });
};

export enum S3Folder {
  STORE = Object(environment.S3_Crad.S3_STORE_FOLDER),
  PRODUCT = Object(environment.S3_Crad.S3_PRODUCT_FOLDER),
}

export const S3Bucket = environment.S3_Crad.S3_BUCKET_NAME;
