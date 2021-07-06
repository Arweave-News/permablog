import './App.css';
//import PostHistory from './components/post_history';
//import PostForm from "./components/post_form.jsx"
import Header from './components/header.jsx'
import Amas from './components/amas.jsx'
import About from './components/about.jsx'
import { HashRouter, Route, BrowserRouter, Switch } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div>
        <div className="">
          <Header/>
        </div>
        <div className="App">
          <Switch>
          <Route exact path="/" component={() => <About/>}>
           {/*<PostForm/>*/}
           
          </Route>
         {/* <Route exact path="/new">
          <PostForm/>
            </Route>
          <Route exact path="/posts">
  <PostHistory/> 
          </Route>
  */}
          <Route exact path="/ama" component={() => <Amas/>}>
          </Route>
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
