import express from "express";
import { router } from "./routers";
import "dotenv/config";
import "./shared/services/translationYup";

const server = express();
server.use(express.json());

server.use(router);

export { server };
