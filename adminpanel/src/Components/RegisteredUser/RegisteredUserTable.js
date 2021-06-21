import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
const RegisteredUserTable = (props) => {
    return (
        <React.Fragment>
           
        <TableCell padding="checkbox">
        <Checkbox
            checked={props.isItemSelected}
            inputProps={{ 'aria-labelledby': props.labelId }}
        />
        </TableCell>
        <TableCell component="th" id={props.labelId} scope="row" padding="none">
        {props.row.email}
        </TableCell>
       
        <TableCell align="right">{props.row.username}</TableCell>
        <TableCell align="right">{props.row.name}</TableCell>
       
        <TableCell align="right">{props.row.phoneno}</TableCell>
        <TableCell align="right">{props.row.branch}</TableCell>
        <TableCell align="right">{props.row.college}</TableCell>
        <TableCell align="right">{props.row.year}</TableCell>
        
  
        </React.Fragment>
    )
}

export default RegisteredUserTable