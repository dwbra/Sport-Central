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

  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAds())
  }, [currentId, dispatch])

  useEffect(() => {
    dispatch(getGames())
  }, [currentId, dispatch])

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
            <Route path="/explore" exact component={() => <Ads setCurrentId={setCurrentId} />}/>
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
