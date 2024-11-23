import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedUsers(count: number) {
  console.log(`Start seeding ${count} users...`);

  const batchSize = 10000;
  for (let i = 0; i < count; i += batchSize) {
    const users = [];

    for (let j = 0; j < Math.min(batchSize, count - i); j++) {
      users.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({ min: 18, max: 100 }),
        gender: faker.helpers.arrayElement(['male', 'female']),
        hasIssues: faker.datatype.boolean(),
      });
    }

    await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });

    console.log(`Inserted ${i + users.length} users...`);
  }

  console.log('Seeding completed.');
}

async function main() {
  const userCount = 1000000;
  await seedUsers(userCount);
}


main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });