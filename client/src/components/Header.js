import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'

function Header(props) {
  const {
    showDoneItem,
    showNotDoneItem,
    setShowDoneItem,
    setShowNotDoneItem,
  } = props
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          シンプルTodoアプリ
        </Typography>
        <Switch
          checked={showDoneItem}
          onChange={() => setShowDoneItem(!showDoneItem)}
        />
        <Typography
          variant="subtitle1"
          color="inherit"
          onClick={() => setShowDoneItem(!showDoneItem)}
        >
          完了済み
        </Typography>
        <Switch
          checked={showNotDoneItem}
          onChange={() => setShowNotDoneItem(!showNotDoneItem)}
        />
        <Typography
          variant="subtitle1"
          color="inherit"
          onClick={() => setShowNotDoneItem(!showNotDoneItem)}
        >
          未完了
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
