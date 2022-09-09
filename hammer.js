import { faker } from '@faker-js/faker'
import fetch from 'node-fetch'

const BASE_URL = 'http://localhost:3000'

const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

for (let i = 0; i < 10; i++) {

  const payload = {
    name: faker.name.fullName(),
    role: faker.name.jobTitle(),
    salary: faker.datatype.float({ min: 1000, max: 10000 })
  }

  console.log(`Making request #${i} with following payload ${JSON.stringify(payload)}`)

  const response = await fetch(`${BASE_URL}/api/employee`, {
    method: 'POST', 
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'}
  })

  if (response.status === 200) {
    console.log(`Request #${i} done with status 200\n\n`)
  }

  await delay(3000)
}
