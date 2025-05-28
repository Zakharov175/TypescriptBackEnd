import { server } from './server/Server';
//to up server : ts-node-dev src/index.ts
import { Knex } from './server/database/knex/';

const PORT = 3000;
const startServer = () => {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  Knex.migrate
    .latest()
    .then(() => {
      startServer();
    })
    .catch(console.log);
} else {
  startServer();
}
