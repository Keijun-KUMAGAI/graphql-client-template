import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css'

import Header from './components/Header'
import Body from './components/Body'


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
  return (
    <div className="App">
      <Header />
      <Query query={todosQuery}>
        {({ loading, data }) => {
          const { todos } = data
          if (loading) return <p>Loading...</p>
          return <Body todos={todos} />
        }}
      </Query>
    </div>
  )
}

export default App
