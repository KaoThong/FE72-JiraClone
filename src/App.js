import "./sass/index.scss";
import { createBrowserHistory } from "history";
import { Redirect, Router, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "components/Loading/Loading";
import UserTemplate from "templates/UserTemplate/UserTemplate";
import HomeTemplate from "templates/HomeTemplate/HomeTemplate";
import DrawerModal from "components/DrawerModal/DrawerModal";
import FormAddTask from "components/Forms/FormAddTask/FormAddTask";

const SignIn = lazy(() => import("pages/SignIn"));
const SignUp = lazy(() => import("pages/SignUp"));
const Home = lazy(() => import("pages/Home"));
const CreateProject = lazy(() => import("pages/CreateProject"));
const ProjectManagement = lazy(() => import("pages/ProjectManagement"));
const ProjectDetail = lazy(() => import("pages/ProjectDetail"));
const taskDetailModal = lazy(() =>
  import("components/TaskModal/TaskDetailModal")
);

export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<Loading />}>
        <DrawerModal />

        <Switch>
          {/* <HomeTemplate path='/dragdrop' exact Component={DragDrop} /> */}
          <HomeTemplate path="/1" exact Component={FormAddTask} />
          <UserTemplate path="/signin" exact Component={SignIn} />
          <UserTemplate path="/signup" exact Component={SignUp} />
          <HomeTemplate path="/" exact Component={ProjectManagement} />
          {/* <Route path="*" component={PageNotFound} /> */}
          <HomeTemplate path="/createproject" exact Component={CreateProject} />
          <HomeTemplate
            path="/projectmanagement"
            exact
            Component={ProjectManagement}
          />

          <HomeTemplate path="/projectdetail/:id" Component={ProjectDetail} />
          <HomeTemplate path="/taskDetail" Component={taskDetailModal} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
