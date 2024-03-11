const { faker } = require('@faker-js/faker');

const generateJobs = (num, employer) => {
    const jobs = [];
    const jobTypes = ['Full Time','Part Time','OnSite','Remote','Contract','Internship']

    for (let i = 0; i < num; i++) {
        jobs.push({
            title: faker.person.jobTitle(),
            description: faker.lorem.paragraph(),
            requirements: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
            responsibilities: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
            jobType: jobTypes[Math.floor(Math.random() * jobTypes.length)],
            company:{
                name: faker.company.name(),
                logo: faker.image.url()
            },
            location: faker.location.city(),
            salaryRange: {
                low: faker.finance.amount({ min: 1000, max: 5000 }),
                high: faker.finance.amount({ min: 5000, max: 10000 }),
                currency: faker.finance.currencyCode()
            },
            employer: employer
        });
    }

    return jobs;
}

module.exports = { generateJobs };