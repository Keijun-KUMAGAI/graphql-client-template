
import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import Card from './Card'
import Form from './Form'
import { createTodoQuery, todosQuery } from '../querys/todoQuerys'


function Body(props) {
  const { todosList } = props
  const [newTodo, setNewTodo] = useState('')
  const [fetching, setFetching] = useState(false)

  const filteredTodos = todosList.filter(item => (
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
        {filteredTodos.map(item => <Card key={item.id} item={item} />)}
      </Grid>
      <Mutation
        mutation={createTodoQuery}
        variables={{ content: newTodo }}
        update={(cache, { data: { createTodo } }) => {
          const { todos } = cache.readQuery({ query: todosQuery })
          cache.writeQuery({
            query: todosQuery,
            data: { todos: todos.concat([createTodo]) },
          })
        }}
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

Body.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    done: PropTypes.bool,
  })).isRequired,
}

export default Body
