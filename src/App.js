import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import ReachOutPage from "./pages/reach_out/ReachOutPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import UsernameForm from "./pages/profiles/UserNameForm";
import BlogsPage from "./pages/blogs/BlogsPage";
import BlogCreateForm from "./pages/blogs/BlogCreateForm";
import BlogPage from "./pages/blogs/BlogPage";
import BlogEditForm from "./pages/blogs/BlogEditForm";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  return (

        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render= {() => ( <h1>Home</h1> )}/>
              <Route exact path="/seecrets" render= {() => ( <PostsPage message='No results are found.Adjust the search keyword' /> )}/>
              <Route exact path="/blogposts" render= {() => ( <BlogsPage message='No results are found.Adjust the search keyword' /> )}/>
              <Route exact path="/hugged" render= {() => ( <PostsPage message='No results are found.Adjust the search keyword or hug somebody' filter={`hugs__owner__profile=${profile_id}&ordering=-hugs__created_at&`}/> )}/>
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/seecrets/create" render={() => <PostCreateForm />} />
              <Route exact path="/seecrets/:id" render={() => <PostPage />} />
              <Route exact path="/seecrets/:id/edit" render={() => <PostEditForm />} />
              <Route exact path="/blogs/create" render={() => <BlogCreateForm />} />
              <Route exact path="/blogs/:id" render={() => <BlogPage />} />
              <Route exact path="/blogs/:id/edit" render={() => <BlogEditForm />} />
              <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
              <Route exact path="/reach_out" render={() => <ReachOutPage />} />
              
              <Route
                exact
                path="/profiles/:id/edit/username"
                render={() => <UsernameForm />}
              />
              <Route
                exact
                path="/profiles/:id/edit/password"
                render={() => <UserPasswordForm />}
              />
              <Route
                exact
                path="/profiles/:id/edit"
                render={() => <ProfileEditForm />}
              />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;