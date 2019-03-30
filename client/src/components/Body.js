
import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import Grid from '@material-ui/core/Grid'
import gql from 'graphql-tag'
import Card from './Card'
import Form from './Form'

const createTodoQuery = gql`
  mutation($content: String!) {
    createTodo(content: $content) {
      id
      done
      content
    }
  }
`

function Body(props) {
  const { todos } = props
  const [newTodo, setNewTodo] = useState('')
  const [fetching, setFetching] = useState(false)

  const filteredTodos = todos.filter(item => (
    // (showDoneItem && item.done === true)
    // || (showNotDoneItem && item.done === false)
    true
  ))

  const asyncSetFetching = async (newValue) => {
    setFetching(newValue)
  }

  const onClickForm = async (createTodo) => {
    await asyncSetFetching(true)
    await createTodo()
    setNewTodo('')
    await asyncSetFetching(false)
  }

  return (
    <div style={{ margin: 24 }}>
      <Grid container spacing={24}>
        {filteredTodos.map(item => (<Card key={item.id} item={item} />))}
      </Grid>
      <Mutation
        mutation={createTodoQuery}
        variables={{ content: newTodo }}
      >
        {createTodo => (
          <Form
            newTodo={newTodo}
            handleChange={v => setNewTodo(v)}
            handleClick={() => onClickForm(createTodo)}
            buttonDisabled={!newTodo || fetching}
          />
        )}
      </Mutation>

    </div>
  )
}

export default Body
