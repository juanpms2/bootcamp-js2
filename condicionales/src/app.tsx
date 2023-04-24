import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { paths } from 'core';
import { LoginScene, SandBoxScene } from 'scenes';

export const App: React.FunctionComponent = () => {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route
            exact={true}
            path={[paths.root, paths.index]}
            component={LoginScene}
          />
          <Route exact={true} path={[paths.sandBox]} component={SandBoxScene} />
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;
