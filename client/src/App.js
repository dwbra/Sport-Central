import IsLoggedIn from "./components/auth/IsLoggedIn";
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
import Home from './components/Home/Home.js'

function App() {
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAds())
  }, [currentId, dispatch])

  return (
    <div>
      <Container maxWidth="lg">
      <Typography variant="h2" align="center">Sport Central</Typography>
      <Router>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create Ad</Link></li>
          <li><Link to="/explore">Explore</Link></li>
        </ul>
        <Switch>
          <Route path="/" exact component={() => <Home />}/>
          <Route path="/create" exact component={() => <Form currentId={currentId} setCurrentId={setCurrentId} />}/>
          <Route path="/explore" exact component={() => <Ads setCurrentId={setCurrentId} />}/>
        </Switch>
      </Router>
        <AppBar position="static" color="inherit">
        <IsLoggedIn/>
        </AppBar> 
    </Container>
    </div>
  );
}

export default App;
