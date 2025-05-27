"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
//to up server : ts-node-dev src/index.ts
const PORT = 3000;
Server_1.server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`);
});
