import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'


function Form(props) {
  const {
    handleChange,
    handleClick,
    newTodo,
    buttonDisabled,
  } = props

  return (
    <Grid container spacing={24}>
      <Grid item xs={9}>
        <TextField
          id="outlined-full-width"
          label="Todo 新規作成"
          style={{ margin: 8 }}
          placeholder="Ex) Flutter勉強する"
          fullWidth
          value={newTodo}
          onChange={e => handleChange(e.target.value)}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          flex: 1,
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <Button
          variant="outlined"
          size="large"
          color="primary"
          disabled={buttonDisabled}
          onClick={async () => handleClick()}
        >
          作成
        </Button>
      </Grid>
    </Grid>
  )
}

export default Form
