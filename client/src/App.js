import React, { useState } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Grid from '@material-ui/core/Grid'
import './App.css'

import Header from './components/Header'
import Card from './components/Card'
import Form from './components/Form'

const todosQuery = gql`
  query {
    todos {
      id
      content
      done
    }
  }
`

function App() {
  const [showDoneItem, setShowDoneItem] = useState(true)
  const [showNotDoneItem, setShowNotDoneItem] = useState(true)
  return (
    <div className="App">
      <Header
        showDoneItem={showDoneItem}
        showNotDoneItem={showNotDoneItem}
        setShowDoneItem={setShowDoneItem}
        setShowNotDoneItem={setShowNotDoneItem}
      />
      <Query query={todosQuery}>
        {({ loading, data, refetch }) => {
          const { todos } = data
          if (loading) return <p>Loading...</p>
          return (
            <div style={{ margin: 24 }}>
              <Grid container spacing={24}>
                {todos
                  .filter(item => (
                    (showDoneItem && item.done === true)
                    || (showNotDoneItem && item.done === false)
                  ))
                  .map(item => (<Card item={item} refetch={refetch} />))
                }
              </Grid>
              <Form refetch={refetch} />
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default App
