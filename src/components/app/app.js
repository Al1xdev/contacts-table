import React from "react";
import { IconButton, Container, Grid, Paper, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import { makeStyles } from "@material-ui/core/styles";

import { ContactTable, Spinner } from "../";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: 'space-between',
  },
  btn: {
    padding: 0,
  },
  pagination: {
    marginTop: 10,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statistic: {
    marginTop: "15px",
    padding: "10px",
  },
  box: {
    display: "flex",
    maxWidth: '30%',
    justifyContent: 'space-between',
  },
});

const App = () => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [usersPerPage] = React.useState(10);
  const [sortType, setSortType] = React.useState("asc");

  React.useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await fetch(
          `https://randomuser.me/api/?page=${currentPage}&results=${usersPerPage}`
        );
        const { results } = await res.json();
        setData(results);
        setIsLoaded(false);
      } catch (error) {
        setError(error);
      }
    };
    getContacts();
  }, [currentPage, usersPerPage]);

  if (error) {
    return <p>Error something went wrong!!!</p>;
  }

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const sortBy = (field) => {
    const sortedContacts = [...data];
    const sortByFieldAsc = (key) => (a, b) =>
      a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;

    const sortedData = sortedContacts.sort(sortByFieldAsc(field));
    const arrContacts = sortType === "asc" ? sortedData : sortedData.reverse();
    setData(arrContacts);
  };

  const genderCount = obj =>{
    const male = obj.reduce((sum, item) => sum + (item.gender === 'male'), 0);
    return {male, female: obj.length - male}
  }

  const genderCountResult = genderCount(data);

  const reloadPage = () => {
    window.location.reload(false);
  };

  return (
    <Container>
      <Grid>
        <Grid className={classes.header}>
          <Typography variant="h3">Contacts</Typography>
          <IconButton onClick={reloadPage}><CachedRoundedIcon /></IconButton>
        </Grid>
        <Grid className={classes.main}>
          {isLoaded ? <Spinner /> : <ContactTable data={data} sort={sortBy} />}
          {data.length > 0 && (
            <Pagination
              className={classes.pagination}
              count={usersPerPage}
              page={currentPage}
              onChange={handleChange}
              color="primary"
            />
          )}
        </Grid>
        <Grid>
          {data.length > 0 && (
            <Paper className={classes.statistic}>
              <Grid>
                <Grid>
                  <Typography variant="h5">Statistic</Typography>
                </Grid>
                <Grid className={classes.box}>
                  <Grid item>
                    <Typography color="textSecondary">Quantity</Typography>
                    <Typography variant="h6">{data.length}</Typography>
                  </Grid>

                  <Grid item>
                    <Typography color="textSecondary">Males</Typography>
                    <Typography variant="h6">{genderCountResult.male}</Typography>
                  </Grid>

                  <Grid item>
                    <Typography color="textSecondary">Females</Typography>
                    <Typography variant="h6">{genderCountResult.female}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
