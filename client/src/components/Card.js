import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import { useMutation } from 'react-apollo-hooks'
import PropTypes from 'prop-types'
import { updateTodoQuery, deleteTodoQuery, todosQuery } from '../querys/todoQuerys'

function Card(props) {
  const { item } = props

  const mutationUpdateTodo = useMutation(updateTodoQuery, {
    variables: { id: item.id, done: !item.done },
    update: (cache, { data: { updateTodo } }) => {
      const { todos } = cache.readQuery({ query: todosQuery })
      const newTodos = todos.map(todo => ((todo.id === updateTodo.id) ? updateTodo : todo))
      cache.writeQuery({
        query: todosQuery,
        data: { todos: newTodos },
      })
    },
  })

  const mutationDeleteTodo = useMutation(deleteTodoQuery, {
    variables: { id: item.id },
    update: (cache, { data: { deleteTodo } }) => {
      const { todos } = cache.readQuery({ query: todosQuery })
      cache.writeQuery({
        query: todosQuery,
        data: { todos: todos.filter(todo => todo.id !== deleteTodo.id) },
      })
    },
  })

  return (
    <Paper>
      <div>
        <Checkbox checked={item.done} onChange={() => mutationUpdateTodo()} />
        {item.content}
      </div>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={mutationDeleteTodo}
      >
        削除
      </Button>
    </Paper>
  )
}

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    done: PropTypes.bool,
  }).isRequired,
}

export default Card
