export default {
	MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "tagstoreimgupload"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://p1o4zvmoe3.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_aJ0Mzloxm",
    APP_CLIENT_ID: "488ipu8jmnst22qn6arn0au8el",
    IDENTITY_POOL_ID: "us-east-1:783e3ab4-5d96-4070-8733-269a4150a2bc"
  }
};