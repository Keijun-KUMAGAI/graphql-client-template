import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const createTodoQuery = gql`
  mutation($content: String!) {
    createTodo(content: $content) {
      id
      done
      content
    }
  }
`

function Form(props) {
  const { refetch } = props
  const [newTodo, setNewTodo] = useState('')

  return (
    <Mutation
      mutation={createTodoQuery}
      variables={{ content: newTodo }}
    >
      {createTodo => (
        <Grid container spacing={24}>
          <Grid item xs={9}>
            <TextField
              id="outlined-full-width"
              label="Todo 新規作成"
              style={{ margin: 8 }}
              placeholder="Ex) Flutter勉強する"
              fullWidth
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid
            item
            xs={3}
            style={{
              display: 'flex',
              flex: 1,
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            <Button
              variant="outlined"
              size="large"
              color="primary"
              disabled={!newTodo}
              onClick={async () => {
                await createTodo()
                setNewTodo('')
                refetch()
              }}
            >
              作成
            </Button>
          </Grid>
        </Grid>
      )}
    </Mutation>
  )
}

export default Form
