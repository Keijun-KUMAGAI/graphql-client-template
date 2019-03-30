import React from 'react'
import './App.css'
import { useQuery } from 'react-apollo-hooks'

import Header from './components/Header'
import Body from './components/Body'
import { todosQuery } from './querys/todoQuerys'


function App() {
  const { data, loading } = useQuery(todosQuery)
  return (
    <div className="App">
      <Header />
      { (loading) ? <p>Loading...</p> : <Body todosList={data.todos} />}
    </div>
  )
}

export default App
