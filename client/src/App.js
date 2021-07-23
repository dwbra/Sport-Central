import {useState, useEffect} from 'react'
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import {api} from './api/index.js'
import Ad from './components/AdForm.js'

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">Sport Central</Typography>
        </AppBar>
        <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Ad />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
    </div>
  );
}

export default App;
