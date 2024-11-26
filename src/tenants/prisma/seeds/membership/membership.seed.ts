import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedMembership() {
  await prisma.membership.deleteMany();

  await prisma.membership.createMany({
    data: [
      {
        tipMembership:"gratuit",
        nr_maxim_intrari_Scrise :4,
        nr_maxim_intrari_Audio :4

      },
      {
        tipMembership:"standard",
        nr_maxim_intrari_Scrise :7,
        nr_maxim_intrari_Audio :7

      },
      {
        tipMembership:"premium",
        nr_maxim_intrari_Scrise :10,
        nr_maxim_intrari_Audio :10

      }],
  });

  console.log("Subscription seed completed!");
}