import { seedCategories } from './seed_category'

async function main() {
  await seedCategories()
}

main()
  .then(() => {
    console.log('Seeding completo!')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
