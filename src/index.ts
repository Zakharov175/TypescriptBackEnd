import { server } from "./server/server";
//to up server : ts-node-dev src/index.ts
// const PORT = process.env.PORT || 3000;
const PORT = 3000;
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
