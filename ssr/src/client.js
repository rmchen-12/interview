import { Switch, Route } from 'react-router-dom';
import routes from './routes-config.js';

function App() {
  return (
    <Layout>
      <Switch>
        {routes.map((item, index) => {
          return (
            <Route
              path={item.path}
              key={index}
              exact={item.exact}
              render={item.component}
            ></Route>
          );
        })}
      </Switch>
    </Layout>
  );
}

export default App;
