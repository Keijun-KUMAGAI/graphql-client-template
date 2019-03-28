import React from 'react'
import { Mutation } from 'react-apollo'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import gql from 'graphql-tag'

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
  const { item, refetch } = props
  return (
    <Grid item xs={12} sm={6} md={6} lg={4} key={item.id}>
      <Paper style={{ height: 50 }}>
        <Mutation
          mutation={updateTodoQuery}
          variables={{ id: item.id, done: !item.done }}
        >
          {updateTodo => (
            <FormControlLabel
              control={
                <Checkbox checked={item.done} onChange={() => updateTodo()} value="jason" />
              }
              label={item.content}
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
              onClick={async () => {
                await deleteTodo()
                refetch()
              }}
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
