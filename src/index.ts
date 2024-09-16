import { prisma } from "./utils/prisma";


async function main() {
  const allUsers=await prisma.user.findMany()
  console.log(allUsers);
}

main()
  .then(async () => {
    console.log("database connected");
  })
  .catch(async (e) => {
    console.error(e);
  });
