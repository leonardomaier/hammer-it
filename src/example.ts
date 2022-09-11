import { hammer } from ".";
import { faker } from '@faker-js/faker' 

hammer('http://localhost:3000/api/employee')
  .withMethod('POST')
  .withHeaders({
    'Content-Type': 'application/json'
  })
  .withPayload({
    name: faker.name.fullName(),
    role: faker.name.jobTitle(),
    salary: faker.datatype.float({ min: 1000, max: 10000 })
  })
  .forManyTimes(2000)
  .delayingMsPerRequest(5000)
  .start()