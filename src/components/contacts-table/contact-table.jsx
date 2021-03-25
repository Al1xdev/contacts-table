import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { Box, Typography } from "@material-ui/core";

import moment from "moment";

import { ClickBoard } from "../";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 15,
  },
  head: {
    backgroundColor: '#ebebeb',
  },
  sort: {
    cursor: 'pointer',
  }
});

const ContactTable = ({ data, sort }) => {
  const classes = useStyles();

  const deletSymbolPhone = str => {
    const regex = /\d/g;
    return str.match(regex).join('');
  }

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="table">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Bithday</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell onClick={() => {sort('nat')}} align="right"><Box display="flex">Nationality <UnfoldMoreIcon className={classes.sort} color="disabled"/></Box></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.login.uuid}>
              <TableCell component="th" scope="row">
                <Avatar alt="Name" src={item.picture.medium} />
              </TableCell>
              <TableCell>
                {item.name.title} {item.name.first} {item.name.last}
              </TableCell>
              <TableCell>
                {moment(item.dob.date).format("DD/MM/YYYY")}
                <Typography>{item.dob.age} years</Typography>
              </TableCell>
              <TableCell>
                <ClickBoard text={item.email} />
              </TableCell>
              <TableCell><ClickBoard text={deletSymbolPhone(item.phone)} /></TableCell>
              <TableCell>{item.location.country}</TableCell>
              <TableCell align="right">{item.nat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactTable;
