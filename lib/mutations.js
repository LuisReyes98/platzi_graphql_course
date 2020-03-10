/**
 * las modificaciones de datos
 * son mutations
 */

'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    let db
    let course

    const newCourse = Object.assign(
      defaults, input
    )
    try {
      db = await connectDb()
      course = await db.collection('courses').insertOne(newCourse)

      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return newCourse
  },
  editCourse: async (root, { _id, input }) => {
    let db
    let course

    try {
      // conectarse a la db
      db = await connectDb()
      // actualizar el curso
      course = await db.collection('courses').updateOne(
        {
          _id: ObjectID(_id)
        },
        {
          $set: input
        }
      )
      // leer el curso de la db
      course = await db.collection('courses').findOne({
        _id: ObjectID(_id)
      })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  createStudent: async (root, { input }) => {
    let db
    let student

    try {
      db = await connectDb()
      student = await db.collection('students').insertOne(input)

      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return input
  },
  editStudent: async (root, { _id, input }) => {
    let db
    let student

    try {
      // conectarse a la db
      db = await connectDb()
      // actualizar el estudiante
      student = await db.collection('students').updateOne(
        {
          _id: ObjectID(_id)
        },
        {
          $set: input
        }
      )
      // leer el estudiante de la db
      student = await db.collection('students').findOne({
        _id: ObjectID(_id)
      })
    } catch (error) {
      errorHandler(error)
    }

    return student
  },
  addPeople: async (root, { courseID, personID }) => {
    let db
    let person
    let course

    try {
      db = await connectDb()

      course = await db.collection('courses').findOne({
        _id: ObjectID(courseID)
      })

      person = await db.collection('students').findOne({
        _id: ObjectID(personID)
      })

      if (!course || !person) throw new Error('la persona no existe')

      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: ObjectID(personID) } }
      )
    } catch (error) {
      errorHandler(error)
    }

    return course
  }

}
