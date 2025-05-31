"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
require("dotenv/config");
const knex_1 = require("./server/database/knex/");
//to up server : ts-node-dev src/index.ts
const startServer = () => {
    Server_1.server.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};
if (process.env.IS_LOCALHOST !== 'true') {
    knex_1.Knex.migrate
        .latest()
        .then(() => {
        knex_1.Knex.seed
            .run()
            .then(() => startServer())
            .catch(console.log);
    })
        .catch(console.log);
}
else {
    startServer();
}
//yarn run knex:rollback-all (remove all dadas)
// yarn run knex:migrate (start migrate)
//yarn run knex:seed
