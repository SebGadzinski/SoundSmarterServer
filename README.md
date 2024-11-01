# BlackBoxVueQuasarAppServer

Server for project BlackBoxVueQuasarApp which is a front end client application using Vue and Quasar. (duh)

## Languages, Tools

- Firebase
- Mocha
- Mongoose
- pm2
- SendGrid
- Typescript

### Firebase

- Push Notifications
  - Web notifications not set up, but mobile is
- Analytics

### Mocha

- Mixed with typescript for great testing! Very nice!

### Mongoose

#### Schema

##### Token

```
{
  _id: Schema.Types.ObjectId;
  referenceId: string;
  reason: string;
  value: string;
  expiration: Date;
  createdBy: string;
  updatedBy: string;
}

```

##### User

```
{
  _id: Schema.Types.ObjectId;
  email: string;
  emailConfirmed: boolean;
  fullName: string;
  password: string;
  phoneNumber?: string;
  mfa: boolean;
  roles: string[];
  claims: Array<{ name: string; value: any }>;
  refreshToken: string;
  salt: string;
  createdBy: string;
  updatedBy: string;
  // Add any instance methods here if needed
}

```

### pm2

- Using PM2 for running the project as a whole as it is a great process manager

### SendGrid

- Sending email using dynamic templates

### Typescript

- Only issue at the moment is with express interface models not working correctly. Messes up with installment of firebase-admin npm package

## Features

1. Email
   - Confirmation
   - Reseting password
   - Alerts
   - Notifications
2. JWT Token Authentication
   - Client takes token from Login
   - Refresh token cycling
3. Multi Processes
   - Server.ts
     - This is what runs with the front end application, or as a identity server
   - Database.ts
     - This is what cleans up the database, runs backend operations...
4. Environment Switching
   - Can switch from dev/test/production

## Testing

Everything for testing is underneath /tests folder.

### /bases

This is where you make your test bases. Test bases are hierarchal, so grab what you need from other bases to minimize the amount of work.

### /data

Any generic data or non generic data files can be stored here.

#### TIP

- When looking into making data, make the schema of the data you want and then get a AI to generate mock data. Give examples to it if complicated.

### /intergration

These are tests that are used to ensure the server is working correctly. They do not contain any connection to the BlackBoxQuasarVueApp.

testrunner.js runs the project in a test environment

### /unit

These are unit tests and are meant to test out services or functions without the connection to the server.

## Configs (src/configs)

### firebase.json

Firebase => Project => Project Settings => Service Accounts => Generate Key

### sendGrid.json

Please put your Dynamic Templates in here.

```
{
  "apiKey": "SG.XXX",
  "email": {
    "alert": "alert@gmail.com",
    "noReply": "do.not.reply@gmail.com"
  }
}
```

## Environment

Using different environment allows you to run your project in different ways. Each one of these enviorments should be pointing to different MongoDB projects/ports.

### Development env.dev

Use when you are working with a database your not trying to clean or wipe.

### Testing env.test

Use when you are writing tests. You should point this to a different port and not the same one as prod or dev so the data on those dont get wiped or corrupted.

### Staging env.staging

Use when you are presenting to your client.

### Production env.prod

Use this for your clients displaying database. This is what should be used for wherever you are running your clients sever.

### Config.js

All environment variables in the .env files get populated into a js object which can be imported from anywhere. Use this instead of process.env.\*\*\*

## pm2

Running command: (@type: ("development", "testing", "production"))

```
pm2 start --env @type
```

## Package.json Scripts

### PM2 Process Management

1. **pm2:server:ENV**
   ```bash
   node -r dotenv/config -r ts-node/register src/processes/Server.ts dotenv_config_path=./.env.ENV
   ```
   - Runs the server on a PM2 process. Replace `ENV` with `dev` or `prod` to run the server in the respective environment.

2. **pm2:database-cleaner:ENV**
   ```bash
   node -r dotenv/config -r ts-node/register src/processes/DatabaseCleaner.ts dotenv_config_path=./.env.ENV
   ```
   - Runs the Database Cleaner on a PM2 process. Replace `ENV` with `dev` or `prod` for the respective environment.

### Server Management

1. **server:ENV**
   ```bash
   nodemon -r dotenv/config src/processes/Server.ts dotenv_config_path=./.env.ENV
   ```
   - Replace `ENV` with `dev`, `prod`, or `test` to run the server in that environment.

### Database Cleaner

1. **database-cleaner:ENV**
   ```bash
   nodemon -r dotenv/config src/processes/DatabaseCleaner.ts dotenv_config_path=./.env.ENV
   ```
   - Replace `ENV` with `dev` or `prod` to run the database cleaner in the respective environment. This currently only cleans tokens.

### Database Seeder

1. **database-seeder:ENV**
   ```bash
   nodemon -r dotenv/config src/processes/DatabaseSeeder.ts dotenv_config_path=./.env.ENV
   ```
   - Replace `ENV` with `dev` or `prod` to run the database seeder. Currently, it seeds users only.

### Testing

1. **test:intergration**
   ```bash
   node -r dotenv/config -r ts-node/register tests/intergration/testrunner.ts dotenv_config_path=./.env.test --exit
   ```
   - Runs the integration tests using the test runner. This will also run the server.

2. **test:intergration-server-on**
   ```bash
   cross-env dotenv_config_path=./.env.test mocha --timeout 0 -r dotenv/config -r ts-node/register tests/intergration/**/*.spec.ts --exit
   ```
   - Runs all integration tests, but the server must be running separately.

3. **test:unit**
   ```bash
   cross-env dotenv_config_path=./.env.test mocha --timeout 0 -r dotenv/config -r ts-node/register tests/unit/**/*.spec.ts --exit
   ```
   - Runs all unit tests.

4. **test:single**
   ```bash
   cross-env dotenv_config_path=./.env.test mocha --timeout 0 -r dotenv/config -r ts-node/register tests/unit/services/notification.spec.ts --exit
   ```
   - Runs a single test. Use this for custom work or testing specific files.

## Project setup

1. Install NodeJS on your machine ([https://nodejs.org/en/download/](https://nodejs.org/en/download/)). Use version 8.9.0/install NVM.
2. Install MongoDB and set up a local server ([https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)).
3. Go to Firebase and create a project. Get the service account for your project. Add it as firebase.json in src/configs.
4. Go to SendGrid, set up a account, and ensure your emails you want to use are verified. Update the information in sendGrid.json in src/configs.
5. Clone the project

```
git clone git@github.com:SebGadzinski/BlackBoxVueQuasarAppServer.git
```

6. Install the packages

```
npm install
npm install -g ts-node
```

7. Run database seeder (/src/configs/db)

```
npm run database-seeder:dev
```

8. Run development

```
npm run server:dev
```

## Future

- MFA via text or face id
- node js => bun
- Other cool services
