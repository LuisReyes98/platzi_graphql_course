'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  Course: {
    // resolviendo un tipo de datos nesteado
    people: async ({ people }) => {
      // se desestructura solo people de los argumentos

      let db
      let peopleData
      let ids

      try {
        // se conecta a la db
        db = await connectDb()

        // se obtine la lista de ids de lo contrario array vacio
        ids = people ? people.map(id => ObjectID(id)) : []

        // data de la people es igual a todos los people que coincidan con la lista de arrays de lo contrario array vacio
        peopleData = ids.length > 0
          ? await db.collection('students').find(
            { _id: { $in: ids } }
          ).toArray()
          : []
      } catch (error) {
        errorHandler(error)
      }
      // se retorna el valor de los people
      return peopleData
    }
  }
}
