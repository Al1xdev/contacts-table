import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

import { ContactTable, Spinner } from "../";

const useStyles = makeStyles({
  pagination: {
    marginTop: 10,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const App = () => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [usersPerPage] = React.useState(10);

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

  return (
    <Container>
      <Grid>
        <Grid>
          <Typography variant="h3">Contacts</Typography>
        </Grid>
        <Grid className={classes.main}>
          {isLoaded ? <Spinner /> : <ContactTable data={data} />}
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
      </Grid>
    </Container>
  );
};

export default App;
