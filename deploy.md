# Deployment Guide for Gemarse Estate

This file contains the exact commands and environment mapping required to deploy the fullstack application.

## 1) Provision AWS resources

From the repository root:

```bash
cd cloudformation
aws cloudformation deploy \
  --template-file gemarse-estate-resources.yaml \
  --stack-name gemarse-estate-resources \
  --parameter-overrides EnvironmentName=prod \
  --capabilities CAPABILITY_NAMED_IAM
```

### Save the CloudFormation outputs

- `S3BucketName`
- `CognitoUserPoolId`
- `CognitoUserPoolClientId`
- `S3UploaderUserName`
- `S3UploaderAccessKeyId`

Also capture the IAM user access key secret shown by AWS after stack creation.

## 2) Create the PostgreSQL database

Provision a PostgreSQL database manually, for example using AWS RDS.

Use a connection string like:

```text
postgresql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME
```

## 3) Backend environment variables

Create `server/.env` with the following values:

```env
PORT=8000
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=replace_with_a_secure_secret
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=ACCESS_KEY_ID_FROM_CLOUDFORMATION
AWS_SECRET_ACCESS_KEY=SECRET_ACCESS_KEY_FROM_AWS
S3_BUCKET_NAME=THE_BUCKET_NAME_OUTPUT
NODE_ENV=production
```

## 4) Frontend environment variables

Create `client/.env.local` with:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=COGNITO_USER_POOL_ID
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID=COGNITO_USER_POOL_CLIENT_ID
NEXT_PUBLIC_APP_URL=https://your-frontend-domain
```

## 5) Seed the database

From the `server/` folder:

```bash
cd server
npm install
npx prisma generate
npm run seed
```

## 6) Deploy the backend

### Option A: AWS Elastic Beanstalk

From the `server/` folder:

```bash
npm install
eb init
eb create gemarse-estate-api
```

Then configure environment variables in the Elastic Beanstalk console or with:

```bash
eb setenv \
  PORT=8000 \
  DATABASE_URL=postgresql://user:password@host:5432/database \
  JWT_SECRET=replace_with_a_secure_secret \
  AWS_REGION=your_aws_region \
  AWS_ACCESS_KEY_ID=ACCESS_KEY_ID_FROM_CLOUDFORMATION \
  AWS_SECRET_ACCESS_KEY=SECRET_ACCESS_KEY_FROM_AWS \
  S3_BUCKET_NAME=THE_BUCKET_NAME_OUTPUT
```

Deploy:

```bash
eb deploy
```

### Option B: Other backend host

Deploy the backend to your chosen hosting service and ensure `NEXT_PUBLIC_API_BASE_URL` points to its public URL.

## 7) Deploy the frontend

### Option A: Vercel

1. Connect the `client` folder to Vercel.
2. Set the frontend environment variables from step 4.
3. Deploy.

### Option B: AWS Amplify Hosting

1. Connect the repository to Amplify.
2. Set environment variables.
3. Deploy.

## 8) Output mapping

| CloudFormation output     | `.env` variable                               |
| ------------------------- | --------------------------------------------- |
| `S3BucketName`            | `S3_BUCKET_NAME`                              |
| `CognitoUserPoolId`       | `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID`        |
| `CognitoUserPoolClientId` | `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID` |
| `S3UploaderAccessKeyId`   | `AWS_ACCESS_KEY_ID`                           |
| IAM Secret Access Key     | `AWS_SECRET_ACCESS_KEY`                       |

## 9) Validate deployment

1. Visit the frontend URL.
2. Sign in or sign up.
3. Ensure API calls succeed.
4. Upload a property image to confirm S3 works.
5. Confirm property data is loaded from the database.

## 10) Notes

- If you deploy the backend behind HTTPS, use that URL in `NEXT_PUBLIC_API_BASE_URL`.
- If you use Vercel or Amplify, set the env vars in the hosting dashboard.
- Keep `JWT_SECRET` secret and do not commit it to source control.
