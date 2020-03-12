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
