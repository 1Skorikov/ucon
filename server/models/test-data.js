const { UniversityModel } = require('./university.model')

const universities = [
  {
    name: 'Petro Mohyla Black Sea National University',
    site: 'https://chmnu.edu.ua/',
    country: 'Ukraine',
    address: '68 Desantnykiv St, Mykolaiv, Mykolaiv Oblast, 54000',
    phone: '0512500333',
    foundedYear: 1996,
    faculties: [
      {
        name: 'Computer Science',
        specialties: [
          {
            name: 'Software engineering',
            groups: [{ number: 408 }, { number: 409 }]
          },
          {
            name: 'Computer science',
            groups: [{ number: 500 }, { number: 501 }]
          }
        ]
      },
      {
        name: 'Economics',
        specialties: [
          { name: 'International economics' },
          { name: 'Business Enterprise Economics' }
        ]
      }
    ]
  },
  {
    name: 'National Technical University of Ukraine (Igor Sikorsky Kyiv Polytechnic Institute)',
    site: 'https://kpi.ua/',
    country: 'Ukraine',
    address: 'Peremohy Ave, 37, Kyiv, 03056',
    phone: '0442049645',
    faculties: [
      {
        id: 0,
        name: 'Chemical Engineering',
        specialties: [
          { id: 0, name: 'Ecology' },
          { id: 1, name: 'Applied mechanics' }
        ]
      },
      {
        id: 1,
        name: 'Physics and Mathematics',
        specialties: [
          { id: 0, name: 'Physics and astronomy' },
          { id: 1, name: 'Mathematics' }
        ]
      }
    ]
  }
]

module.exports = () => {
  UniversityModel.create(universities)
}
