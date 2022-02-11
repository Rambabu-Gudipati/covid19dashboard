import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Vaccination from './components/Vaccination'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/vaccination" component={Vaccination} />
  </Switch>
)
export default App
