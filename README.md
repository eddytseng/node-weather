# Node Weather Server

## Prerequisites

1. Run `npm install`.

2. Sometimes, you'll have to install MySQL manually.

   ```npm install --save mysql2```

3. Mongo DB

   1. Download mongodb (this is different from the npm package).

   2. Install the program to run a database on your local machine.

   3. Extract the file and rename the folder to `mongo`

   4. Move the folder to the ~/ (root) directory

   5. In the root directory: `mkdir mongo-data`\

## Development

1. Start up MongoDB server

   1. `cd ~/mongo/bin`

   2. `./mongod --dbpath ~/mongo-data`

2. Start up Run MySQL

3. `npm run dev`

## Test

`npm run test-watch`