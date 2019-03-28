async function createTodo(parent, args, context, info) {
  return await context.prisma.createTodo({ ...args })
}

async function updateTodo(parent, args, context, info) {
  return await context.prisma.updateTodo({
    data: { done: args.done },
    where: { id: args.id }
  })
}

async function deleteTodo(parent, args, context, info) {
  return await context.prisma.deleteTodo({ id: args.id })
}


module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
}