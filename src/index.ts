import { server } from './server/Server';
import 'dotenv/config';
import { Knex } from './server/database/knex/';
//to up server : ts-node-dev src/index.ts


const startServer = () => {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT }`);
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed
        .run()
        .then(() => startServer())
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}

//yarn run knex:rollback-all (remove all dadas)
// yarn run knex:migrate (start migrate)
//yarn run knex:seed
