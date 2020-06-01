import aws from "aws-sdk";

import { awsConfig } from "@/config";
import { wrapperAsync } from "@/helper";

aws.config.update({
  region: awsConfig.region,
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
  signiture: "v4"
});

const S3_BUCKET = awsConfig.bucketName;

export const signS3 = wrapperAsync(async (req, res, next) => {
  const { fileName, fileType } = req.body;
  const s3 = new aws.S3();
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: "public-read"
  };

  s3.getSignedUrl("putObject", s3Params, (err, signedRequest) => {
    if (err) {
      throw err;
    }
    const data = {
      signedRequest,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json({ success: true, data });
  });
});
