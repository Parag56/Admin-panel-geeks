import React from 'react'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
const ErrorSnackBar = (props) => {
    return (
        <div >
        {/* <Button variant="outlined" onClick={props.handleClick}>
          Open success snackbar
        </Button> */}
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
          <Alert onClose={props.handleClose} elevation={6} variant="filled" severity="error">
            {props.error}
          </Alert>
        </Snackbar>
        {/* <Alert severity="error">This is an error message!</Alert>
        <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert>
        <Alert severity="success">This is a success message!</Alert> */}
      </div>
    )
}

export default ErrorSnackBar
