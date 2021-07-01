import './App.css';
import PostHistory from './components/post_history';
import PostForm from "./components/post_form.jsx"
import Header from './components/header.jsx'
import Amas from './components/amas.jsx'
import { Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="">
          <Header/>
        </div>
        <div className="App">
          <Route exact path="/">
           <PostForm/>
          </Route>
          <Route exact path="/new">
          <PostForm/>
            </Route>
          <Route exact path="/posts">
            <PostHistory/>
          </Route>
          <Route exact path="/ama">
            <Amas page="home"/>
          </Route>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
