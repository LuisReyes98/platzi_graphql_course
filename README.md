# Curso graphql Notas

## Tipos de datos

- String
- Integer
- float
- boolean

## mongo DB

coneccion a mongo db autenticados

```shell
mongo -u user -p password --authenticationDatabase admin
```

## Query

piden datos a la API

```graphql
{
  getCourses {
    _id
    title
    teacher
    description
    topic
    people {
      _id
      name
      email
    }
  }
}
```

## Mutations

realizan cambios, de creacion, edicion y eliminacion

```graphql
mutation {
  createCourse(input: {
    title: " Titulo"
    description: "Descripcion"
    topic: "Topic"
  }) {
    _id
    title
  }
}
```

## Aliases en una query

permite nombrar consulatas para realizar multiples consultas en una sola query

```graphql
{
  AllCourses: getCourses{
    _id
    title
  },
  Course1: getCourse(id:  "5e6423b4afc719b291ce5ecb") {
    _id
    title
    teacher
    description
    topic
  },
  Course1A: getCourse(id:  "5e6423b4afc719b291ce5ecb") {
    title
    description
  },
}
```

## Fragments

Permite establecer campos a pedir en una consulta y usarlos de forma reutilizable

```graphql
{
  AllCourses: getCourses{
    ...CourseFields
  },
  Course1: getCourse(id:  "5e6423b4afc719b291ce5ecb") {
    ...CourseFields
    topic
  },
  Course1A: getCourse(id:  "5e6423b4afc719b291ce5ecb") {
    ...CourseFields
    teacher
  },
}

fragment CourseFields on Course {
  _id
  title
  description
  people{
    _id
    name
  }
}
```

## Variables

permite crear queries reutilizables en nuestra API

```graphql
mutation AddPersonToCourse2($course: ID!, $person: ID!){
  addPeople(courseID: $course, personID: $person){
    _id
    title
  }
}
```

```graphql
query GetCourse2($course: ID!){
  getCourse(id: $course){
    _id
    title
    people{
      _id
      name
    }
  }
}
```

## Enums

permite declarar en el esquema campos que tienen valores especificos cuya validacion es automatica.

```graphql
enum Level {
  principiante
  intermedio
  avanzado
}
```

## Intefaces

permiten agrupar tipos de datos que tengan campos en comun y relacionarlos como un grupo en comun

```graphql
interface Person {
  _id: ID!
  name: String!
  email: String!
}


type Student implements Person {
  _id: ID!
  name: String!
  email: String!
  avatar: String
}


type Monitor implements Person  {
  _id: ID!
  name: String!
  email: String!
  phone: String
}
```

y realizar perticiones de datos condicional si el dato es de algun tipo

```graphql
{
  getPeople{
    _id
    name
    email
    ... on Monitor {
      phone
    }
    ... on Student {
      avatar
    }
  }
}
```

## Skip e Include

permiten agregar o ignorar informacion en un query en base a un booleano

```graphql
query getPeopleData($monitor: Boolean!, $notAvatar: Boolean!){
  getPeople{
    _id
    name
    ... on Monitor @include(if: $monitor){
      phone
    }
    ... on Student @skip(if: $notAvatar){
      avatar
      email
    }
  }
}
```

## Deprecated

en el esquema el uso de deprecated ayuda a evolucionar la api de forma progresiva, informando que cierta informacion no estara disponible en el futuro

```graphql
type Course {
  _id: ID!
  title: String!
  teacher: String
  description: String!
  topic: String @deprecated
  people: [Student]
  level: Level
}
```

## Unions

permite relacionar objetos que no tengan relacion para realizar consultas globales a todos los que son parte del union.

en el squema:

```graphql
union GlobalSearch = Course | Student | Monitor
```

se deben generar resolvers especificos para solventar el union y una query se haria de la siguiente forma:

```graphql
{
  searchItems(keyword: "1"){
    __typename
    ... on Course{
      title
      description
      teacher
      level
    }
    ... on Monitor {
      name
      phone
    }
    ... on Student {
      name
      email
    }
  }
}
```
