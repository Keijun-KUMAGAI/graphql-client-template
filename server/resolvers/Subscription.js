const subscribeTodo = {
  subscribe: async (parent, args, context, info) => {
    return context.prisma.$subscribe.todo({ 
      mutation_in: ['UPDATED', 'CREATED']
    }).node()
  },
  resolve: payload => {
    return payload
  }
}

module.exports = {
  subscribeTodo
}