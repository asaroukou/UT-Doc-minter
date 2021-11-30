import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const categoryData: Prisma.CategoryCreateInput[] = [
    {
        name: 'Mathématique',
        description: 'Mathématique',
    },
    {
        name: 'Informatique',
        description: 'Informatique',
    },
    {
        name: 'Physique',
        description: 'Physique',
    },
    {
        name: 'Biologie',
        description: 'Biologie',
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const c of categoryData) {
        const category = await prisma.category.create({
            data: c,
        })
        console.log(`Created category with id: ${category.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })