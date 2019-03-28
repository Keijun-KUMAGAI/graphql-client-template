function info(parent, args, context, info) {
  return "THIS API IS WORKING!!"
}

async function todos(parent, args, context, info) {
  return await context.prisma.todoes()
}

async function findTodo(parent, args, context, info) {
  return await context.prisma.todo({ id: args.id })
}

module.exports = {
  info,
  todos,
  findTodo
}