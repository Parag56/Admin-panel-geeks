import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
const MemberDatatable = (props) => {
    return (
        <React.Fragment>
           
        <TableCell padding="checkbox">
        <Checkbox
            checked={props.isItemSelected}
            inputProps={{ 'aria-labelledby': props.labelId }}
        />
        </TableCell>
        {/* <TableCell component="th" id={props.labelId} scope="row" padding="none">
        {props.row.id}
        </TableCell> */}
         <TableCell  id={props.labelId} scope="row" >{props.row.name}</TableCell>
        <TableCell id={props.labelId} scope="row" >{props.row.membername}</TableCell>
        <TableCell align="right">{props.row.memberpost}</TableCell>
        <TableCell align="right"  scope="row" >{props.row.year}</TableCell>
        <TableCell align="right">{props.row.companyname}</TableCell>
  
</React.Fragment>
    )
}

export default MemberDatatable
