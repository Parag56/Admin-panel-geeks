import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
const AdminTable = (props) => {
    return (
        <React.Fragment>
           
        <TableCell padding="checkbox">
        <Checkbox
            checked={props.isItemSelected}
            inputProps={{ 'aria-labelledby': props.labelId }}
        />
        </TableCell>
        <TableCell >{props.row.name}</TableCell>
        <TableCell component="th" id={props.labelId} scope="row" padding="none">
        {props.row.adminemail}
        </TableCell>
       
        <TableCell align="right">{props.row.adminname}</TableCell>
  
        </React.Fragment>
    )
}

export default AdminTable
