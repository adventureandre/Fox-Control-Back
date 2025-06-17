import { seedCategories } from './seed_category'
import { seedMaquinario } from './seed_maquinario'

async function main() {
  await seedCategories()
  await seedMaquinario()
}

main()
  .then(() => {
    console.log('Seeding completo!')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
