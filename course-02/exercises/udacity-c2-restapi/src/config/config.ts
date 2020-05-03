export const config = {
  "dev": {
    "username": "postgres",
    "password": "postgres",
    "database": "postgres",
    "host": "udaydb.cjnv06iyrpkv.us-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "default",
    "aws_media_bucket": "udaytravel-website"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  },
  "jwt" : {
   "secret" : "hello"
  }
}
