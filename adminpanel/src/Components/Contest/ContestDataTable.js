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
                {/* <TableCell component="th" id={props.labelId} scope="row" padding="none">
                {props.row.id}
                </TableCell> */}
                 <TableCell align="right" id={props.labelId} scope="row" >{props.row.name}</TableCell>
                <TableCell align="right" id={props.labelId} scope="row" >{props.row.contestname}</TableCell>
                <TableCell align="right">{props.row.contestduration}</TableCell>
                <TableCell align="right">{props.row.starttime}</TableCell>
                <TableCell align="right">{props.row.endtime}</TableCell>
                <TableCell align="right">{props.row.contesttype}</TableCell>
                <TableCell align="right">{props.row.noofquestions}</TableCell>
                <TableCell align="right">{props.row.totalslots}</TableCell>
                <TableCell align="right">{props.row.slotstrength}</TableCell>
               
                
          
     </React.Fragment>
    )
}

export default ContestDataTable