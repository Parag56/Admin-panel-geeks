import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
const QuestionDataTable = (props) => {
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
        <TableCell align="right">{props.row.name}</TableCell>
        <TableCell align="right">{props.row.question}</TableCell>
        <TableCell align="right">{props.row.correctvalue}</TableCell>
        <TableCell align="right">{props.row.score}</TableCell>
  
       </React.Fragment>
    )
}

export default QuestionDataTable
