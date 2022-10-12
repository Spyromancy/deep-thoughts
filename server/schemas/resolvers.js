const { User, Thought } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // Get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    login: async () => {},
  },
};

module.exports = resolvers;
