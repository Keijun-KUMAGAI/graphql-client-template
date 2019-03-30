import gql from 'graphql-tag'

export const todosQuery = gql`
  query {
    todos {
      id
      content
      done
    }
  }
`

export const createTodoQuery = gql`
  mutation($content: String!) {
    createTodo(content: $content) {
      id
      done
      content
    }
  }
`

export const updateTodoQuery = gql`
  mutation($id: ID! $done: Boolean!) {
    updateTodo(id: $id, done: $done ) {
      id
      done
      content
    }
  }
`

export const deleteTodoQuery = gql`
  mutation($id: ID!) {
    deleteTodo(id: $id) {
      id
      done
      content
    }
  }
`
