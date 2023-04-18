# BACK-END SCP
# Requirements

* MYSQL
* NODE

## Before starting

* Before starting, lets go install all dependencies.
* Run: npm install
#### Create databases 
*  CREATE DATABASE 'scp';
* CREATE DATABASE 'scp_test';
#### Run this script: 
* npx prisma migrate dev. It is very important to have the prisma cli installed.

## Environments
* Change these enviroments to your local settings
![enviroment-prisma](https://user-images.githubusercontent.com/76568887/201209247-1bfd35c9-3f71-48a3-ac9e-7210fb740be2.jpeg)
![env](https://user-images.githubusercontent.com/76568887/201209193-0c8aaeeb-d73b-495b-a214-d286ebec600d.jpeg)
![env_test](https://user-images.githubusercontent.com/76568887/201209165-b72ba0e5-2c82-4c22-9872-1f815507be8f.jpeg)

#### Run units tests
* npm run test
#### Run integration and E2E tests
* npm run test:e2e

### For more information about enpoints , access the file endpoints.
 * Download the endpoints file and import into insomnia to have access to all endpoints




