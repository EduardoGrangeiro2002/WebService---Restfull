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

1. Add pilots and their ships to the system.

2. Publish transport contracts

3. Travel between planets
Pilots can travel freely through the galaxy, respecting the limitations of the ship and blocked routes. See the travels section.

4. List open contracts

5. Accept transport contracts

6. Grant credits to the pilot after fulfilling the contract
The system must finish the contract when the pilot gets to the delivery destination. After that, the pilot receives the number of credits specified as value.

7. Register a refill of the fuel
You can register a refill when the ship is on any planet. A fuel unit costs 7 credits.

8. Reports
As a government system, they want to know what's going on. They required you to make some reports:

