import React, {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Container} from '@material-ui/core'
import {useDispatch } from 'react-redux'
import { getAds } from './actions/ads.js'
import { getGames } from './actions/games.js'
import Form from './components/Form/Form.js'
import Navbar from './components/Navbar/Navbar.js'
import Home from './components/Home/Home.js'
import Auth from './components/auth/Auth.js'
import Index from './components/Index/Index.js'
import Inbox from './components/Inbox/Inbox.js'
import AdDetail from './components/Ads/Ad/AdDetail.js';
import FindATeam from './components/FindATeam/FindATeam.js'
import MessageIndex from './components/Message/MessageIndex.js';
import Ads from './components/Ads/Ads.js';
import Message from './components/Message2/Message.js';
import Games from './components/Games/Games.js'

function App() {
  // React hook to set the current id of the ads to initially be null
  const [currentId, setCurrentId] = useState(null)
  // Initialises the useDispatch function from redux
  const dispatch = useDispatch()

  // useEffect that will dispatch to get ads and re-run every time there is a change in the variables in the dependency array
  useEffect(() => {
    dispatch(getAds())
  }, [currentId, dispatch])

  // useEffect that will dispatch to get games and re-run every time there is a change in the variables in the dependency array
  useEffect(() => {
    dispatch(getGames())
  }, [currentId, dispatch])

  // Returns the navbar components, along with all the relevant routes for the buttons in the navbar component
  return (
      <Router>
        <Container>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Index}/>
            <Route path="/home" exact component={() => <Home setCurrentId={setCurrentId} />}/>
            <Route path="/auth" exact component={Auth}/>
            <Route path="/inbox" exact component={Inbox}/>
            <Route path="/create" exact component={() => <Form currentId={currentId} setCurrentId={setCurrentId} />}/>
            <Route path="/message" exact component={MessageIndex}/>
            <Route path="/explore" exact component={() => <Ads setCurrentId={setCurrentId} distance={''} gender={'All'} compOrCasual={'All'} skillLevel={'All'} sport={'All'} />}/>
            <Route path="/explore/:id" component={AdDetail} />
            <Route path="/find" exact component={FindATeam}/>
            <Route path="/message2" exact component={Message}/>
            <Route path="/games" exact component={() => <Games setCurrentId={setCurrentId} />}/>
          </Switch>
        </Container>
      </Router>
  );

}

export default App;
