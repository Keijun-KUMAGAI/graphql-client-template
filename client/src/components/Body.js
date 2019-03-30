
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo-hooks'

import Card from './Card'
import Form from './Form'
import { createTodoQuery, todosQuery } from '../querys/todoQuerys'

function Body(props) {
  const { todosList, flag } = props
  const [newTodo, setNewTodo] = useState('')
  const [fetching, setFetching] = useState(false)

  const filteredTodos = todosList.filter((item) => {
    if (flag === 'all') return true
    if (flag === 'done' && item.done) return true
    if (flag === 'not_yet' && !item.done) return true
    return false
  })

  const asyncSetFetching = async (newValue) => {
    setFetching(newValue)
  }

  const onClickForm = async (createTodo) => {
    await asyncSetFetching(true)
    await createTodo()
    setNewTodo('')
    await asyncSetFetching(false)
  }

  const mutationCreateTodo = useMutation(createTodoQuery, {
    variables: { content: newTodo },
    update: (cache, { data: { createTodo } }) => {
      const { todos } = cache.readQuery({ query: todosQuery })
      cache.writeQuery({
        query: todosQuery,
        data: { todos: todos.concat([createTodo]) },
      })
    },
  })

  return (
    <div style={{ margin: 24 }}>
      <Grid container spacing={24}>
        {filteredTodos.map(item => (
          <Grid key={item.id} item xs={12} sm={6} md={6} lg={4}>
            <Card item={item} />
          </Grid>
        ))}
      </Grid>
      <Form
        newTodo={newTodo}
        handleChange={v => setNewTodo(v)}
        handleClick={() => onClickForm(mutationCreateTodo)}
        buttonDisabled={!newTodo || fetching}
      />
    </div>
  )
}

Body.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    done: PropTypes.bool,
  })).isRequired,
  flag: PropTypes.string.isRequired,
}

export default Body
