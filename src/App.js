import "./App.css";
import React from "react";
import {postsdata} from "./data";
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useParams, useLocation, useHistory } from "react-router-dom";

const Post = ({lang}) => {
  const {id} = useParams();
  const index = postsdata.findIndex(post => post.id === id);
  const location = useLocation();
  const post = postsdata[index];
  const nextPost = postsdata[(index+1) % postsdata.length];
  return (
    <article>
      <section>
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      </section>
      <aside>
        <p><Link to="/">Home</Link></p>
        <p><Link to={`/${lang}/post/${nextPost.id}`}>{nextPost.title}</Link></p>
        <p>Current location: {location.pathname}</p>
        <p>{post.side}</p>
      </aside>
    </article>
  );
};

const Posts = ({posts, lang}) => {
  const history = useHistory();
  return (
    <div>
    <ul>
      {posts.map((post, index) => (
        <li key={index}>
          <Link to={`/${lang}/post/${post.id}`}> {post.title} </Link>
        </li>
      ))}
    </ul>
    <p>Visited pages: {history.length}</p>
    </div>
  );
};

function App({lang}) {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYdYHM0kBZp3fqZPB1BkbzXr-M4AAWGC7JFW4eWOxmi-bY22R2KnTY3dkWrNfFkdMsUyw&usqp=CAU"
            className="App-logo"
            alt="logo"
          />
          <h2 className="App-title"> My posts</h2>
        </header>
        <section>
        <Switch>
            <Route exact path={`/${lang}/post/:id`}>
              <Post lang={lang}/>
            </Route>
            <Route exact path="">
              <Posts posts={postsdata} lang={lang}/>
            </Route>
          </Switch>
        </section>
      </div>
    </Router>
  );
}

function LocalizedApp (){
  return (
    <Router>
          <Switch>
            <Route exact path="/ru">
              <App lang="ru" />
            </Route>
            <Route exact path="/en">
              <App lang="en" />
            </Route>
            <Redirect from="" to="/ru"/>
          </Switch>
    </Router>
  )
}
export default LocalizedApp;
