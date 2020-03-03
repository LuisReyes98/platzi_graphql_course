// Configurar los resolvers
'use strict'

const courses = [
  {
    _id: 'anyid',
    title: 'mi titulo',
    teacher: 'mi profesor',
    description: 'lorem descripcion',
    topic: 'games and fun'
  },
  {
    _id: 'anyid',
    title: 'mi titulo2',
    teacher: 'mi profesor',
    description: 'lorem descripcion',
    topic: 'games and fun'
  },
  {
    _id: 'anyid',
    title: 'mi titulo3',
    teacher: 'mi profesor',
    description: 'lorem descripcion',
    topic: 'games and fun'
  }
]

module.exports = {
  getCourses: () => {
    return courses
  }
}
