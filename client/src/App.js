import React from 'react'
import { Query } from 'react-apollo'
import './App.css'

import Header from './components/Header'
import Body from './components/Body'
import { todosQuery } from './querys/todoQuerys'

function App() {
  return (
    <div className="App">
      <Header />
      <Query query={todosQuery}>
        {({ loading, data }) => {
          const { todos } = data
          if (loading) return <p>Loading...</p>
          return <Body todosList={todos} />
        }}
      </Query>
    </div>
  )
}

export default App
