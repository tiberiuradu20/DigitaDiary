import { PrismaClient} from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedUsers() {
  await prisma.user.deleteMany();




  const parola1 = await bcrypt.hash("parola", 10);
  const parola2 = await bcrypt.hash("parolaa", 10);

  await prisma.user.createMany({
    data: [
      {
        nume: "Baesu",
        prenume: "TIberiu",
        email: "jurnaldetest@gmail.com",
        parola: parola1,
      }],
  });

  console.log("User seed completed!");
}
