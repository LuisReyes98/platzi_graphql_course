'use strict'

require('dotenv').config()
// const { buildSchema } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')

const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()

const port = process.env.port || 3000

// definiendo el esquema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// se declara en que url de nuestra api se ejecutara el middleware
app.use('/api', gqlMiddleware({
  schema: schema, // el schema de graphql
  rootValue: resolvers, // los resolvers que declaramos antes
  graphiql: true // activar entorno de desarrollo

}))

app.listen(
  port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`)
  }
)

// Ejecutar el query hello
// graphql(schema, '{ saludo }', resolvers).then( data => {
//   console.log(data)
// })
