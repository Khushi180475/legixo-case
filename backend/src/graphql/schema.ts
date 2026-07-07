import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type DashboardSummary {
    totalCases: Int!
    upcomingHearings: Int!
    pendingTasks: Int!
    completedTasks: Int!
  }

  type Task {
    _id: String!
    caseId: String!
    title: String!
    dueDate: String!
    ownerName: String!
    priority: String!
    status: String!
  }

  type Query {
    dashboardSummary: DashboardSummary!
  }

  type Mutation {
    toggleTaskStatus(id: String!, status: String!): Task!
  }
`);
