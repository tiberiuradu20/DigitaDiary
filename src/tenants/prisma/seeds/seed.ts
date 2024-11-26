
import { seedUsers } from "./user/user.seed";
import { seedMembership } from "./membership/membership.seed";
async function main() {
  console.log("Starting seed...");


  //await seedUsers();
  await seedMembership();
  console.log("All seeds completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding finished.");
  });
