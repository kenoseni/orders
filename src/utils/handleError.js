import { GraphQLYogaError } from "@graphql-yoga/node";

export const handleError = (message) => {
  throw new GraphQLYogaError(message);
};
