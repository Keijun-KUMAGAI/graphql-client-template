import React from 'react'
import { Mutation } from 'react-apollo'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import gql from 'graphql-tag'

import CardCheckBox from './CardCheckBox'

const updateTodoQuery = gql`
  mutation($id: ID! $done: Boolean!) {
    updateTodo(id: $id, done: $done ) {
      id
      done
      content
    }
  }
`

const deleteTodoQuery = gql`
  mutation($id: ID!) {
    deleteTodo(id: $id) {
      id
      done
      content
    }
  }
`

function Card(props) {
  const { item } = props
  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Paper style={{ height: 100 }}>
        <Mutation
          mutation={updateTodoQuery}
          variables={{ id: item.id, done: !item.done }}
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
