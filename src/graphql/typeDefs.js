const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    created_at: String!
    updated_at: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Employee {
    id: ID!
    eid: String!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    created_at: String!
    updated_at: String!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input AddEmployeeInput {
    eid: String!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
  }

  input UpdateEmployeeByEidInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    designation: String
    salary: Float
    date_of_joining: String
    department: String
    employee_photo: String
  }

  type Query {
    health: String!
    login(username_or_email: String!, password: String!): AuthPayload!
    getAllEmployees: [Employee!]!
    searchEmployeeByEid(eid: String!): Employee
    searchEmployeeByDesignationOrDepartment(
      designation: String
      department: String
    ): [Employee!]!
  }

  type Mutation {
    signup(input: SignupInput!): User!
    addEmployee(input: AddEmployeeInput!): Employee!
    updateEmployeeByEid(eid: String!, input: UpdateEmployeeByEidInput!): Employee!
    deleteEmployeeByEid(eid: String!): Boolean!
  }
`;

module.exports = typeDefs;
