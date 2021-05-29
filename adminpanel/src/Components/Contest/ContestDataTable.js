import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
const ContestDataTable = (props) => {
    return (
        <React.Fragment>
           
                <TableCell padding="checkbox">
                <Checkbox
                    checked={props.isItemSelected}
                    inputProps={{ 'aria-labelledby': props.labelId }}
                />
                </TableCell>
                <TableCell component="th" id={props.labelId} scope="row" padding="none">
                {props.row.id}
                </TableCell>
               
                <TableCell align="right">{props.row.Contestname}</TableCell>
                <TableCell align="right">{props.row.starttime}</TableCell>
                <TableCell align="right">{props.row.endtime}</TableCell>
                <TableCell align="right">{props.row.questions}</TableCell>
                <TableCell align="right">{props.row.contestduration}</TableCell>
                <TableCell align="right">{props.row.prize}</TableCell>
                <TableCell align="right">{props.row.registeredusers}</TableCell>
                
          
     </React.Fragment>
    )
}

export default ContestDataTable