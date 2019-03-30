import React from 'react'
import { Mutation } from 'react-apollo'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { updateTodoQuery, deleteTodoQuery, todosQuery } from '../querys/todoQuerys'

import CardCheckBox from './CardCheckBox'

function Card(props) {
  const { item } = props
  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Paper style={{ height: 100 }}>
        <Mutation
          mutation={updateTodoQuery}
          variables={{ id: item.id, done: !item.done }}
          update={(cache, { data: { updateTodo } }) => {
            const { todos } = cache.readQuery({ query: todosQuery })
            const newTodos = todos.map(todo => ((todo.id === updateTodo.id) ? updateTodo : todo))
            cache.writeQuery({
              query: todosQuery,
              data: { todos: newTodos },
            })
          }}
        >
          {updateTodo => (
            <CardCheckBox
              label={item.content}
              checked={item.done}
              handleClick={updateTodo}
            />
          )}
        </Mutation>
        <Mutation
          mutation={deleteTodoQuery}
          variables={{ id: item.id }}
          update={(cache, { data: { deleteTodo } }) => {
            const { todos } = cache.readQuery({ query: todosQuery })
            cache.writeQuery({
              query: todosQuery,
              data: { todos: todos.filter(todo => todo.id !== deleteTodo.id) },
            })
          }}
        >
          {deleteTodo => (
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => deleteTodo()}
            >
              削除
            </Button>
          )}
        </Mutation>
      </Paper>
    </Grid>
  )
}

export default Card
