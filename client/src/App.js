import React, {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import {useDispatch } from 'react-redux'
import { getAds } from './actions/ads.js'
import Ads from './components/Ads/Ads.js'
import Form from './components/Form/Form.js'

function App() {
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAds())
  }, [currentId, dispatch])

  return (
    <div className="App">
      <Container maxWidth="lg">
      <Typography variant="h2" align="center">Sport Central</Typography>
      <Router>
          <ul>
            <li><Link to="/create">Create Ad</Link></li>
            <li><Link to="/explore">Explore</Link></li>
          </ul>
        <Switch>
          <Route path="/create" component={() => <Form currentId={currentId} setCurrentId={setCurrentId} />}/>
          <Route path="/explore" component={() => <Ads setCurrentId={setCurrentId} />}/>
        </Switch>
      </Router>
        <AppBar position="static" color="inherit">

        </AppBar>
        {/* <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Ads setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow> */}
    </Container>
    </div>
  );
}

export default App;
