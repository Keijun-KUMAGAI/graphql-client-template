import React, { useState } from 'react'
import './App.css'
import { useQuery } from 'react-apollo-hooks'
import Checkbox from '@material-ui/core/Checkbox'

import Header from './components/Header'
import Body from './components/Body'
import { todosQuery } from './querys/todoQuerys'


function App() {
  const { data, loading } = useQuery(todosQuery)
  const [flag, setFlag] = useState('all')
  return (
    <div className="App">
      <Header>
        <Checkbox checked={flag === 'all'} onChange={() => setFlag('all')} />
          all
        <Checkbox checked={flag === 'done'} onChange={() => setFlag('done')} />
          done
        <Checkbox checked={flag === 'not_yet'} onChange={() => setFlag('not_yet')} />
          not yet
      </Header>
      { (loading) ? <p>Loading...</p> : <Body todosList={data.todos} flag={flag} />}
    </div>
  )
}

export default App
