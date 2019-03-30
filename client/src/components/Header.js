import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import Switch from '@material-ui/core/Switch'

function Header(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Todoアプリ
        </Typography>
        { props.children }
      </Toolbar>
    </AppBar>
  )
}

export default Header
