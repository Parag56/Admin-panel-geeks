import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
const PendingUserTable = (props) => {
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
       
        <TableCell align="right">{props.row.name}</TableCell>
        <TableCell align="right">{props.row.id}</TableCell>
        
  
        </React.Fragment>
    )
}

export default PendingUserTable