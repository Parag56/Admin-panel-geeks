import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
const ContestDataTable = (props) => {
    const sdate=new Date(props.row.starttime)
    const edate= new Date(props.row.endtime)
    const contestduration=props.row.contestduration
    const hrs=parseInt(contestduration/(3600000))
    const min=parseInt(contestduration%3600000)/60000
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
                <TableCell align="right">{hrs+" hr :"+min+" min"}</TableCell>
                <TableCell align="right"  scope="row" >{sdate.toString().split('GMT')[0] }</TableCell>
                <TableCell align="right">{edate.toString().split('GMT')[0]}</TableCell>
                <TableCell align="right">{props.row.contesttype}</TableCell>
                <TableCell align="right">{props.row.noofquestions}</TableCell>
                <TableCell align="right">{props.row.totalslots}</TableCell>
                <TableCell align="right">{props.row.slotstrength}</TableCell>
               
                
          
     </React.Fragment>
    )
}

export default ContestDataTable