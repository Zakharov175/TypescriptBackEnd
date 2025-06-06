import express from 'express';
import cors from 'cors';
import { router } from './routers';
import 'dotenv/config';
import './shared/services/translationYup';

const server = express();
server.use(cors({ origin: process.env.ENABLED_CORS?.split(';') || [] }));
server.use(express.json());

server.use(router);

export { server };
