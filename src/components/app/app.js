import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";

import { ContactTable, Spinner } from "../";

const App = () => {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=20");
        const { results } = await res.json();
        setData(results);
        setIsLoaded(false);
      } catch (error) {
        setError(error);
      }
    };
    getContacts();
  }, []);
  
  if (error) {
    return <p>Error something went wrong!!!</p>;
  }

  return (
    <Container>
      <Grid>
        <Grid>
          <Typography variant="h3">Contacts</Typography>
        </Grid>
        <Grid>{isLoaded ? <Spinner /> : <ContactTable data={data} />}</Grid>
      </Grid>
    </Container>
  );
};

export default App;
