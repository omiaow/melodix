import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Tasks from './pages/tasks';
import Play from './pages/play';
import MyBand from './pages/myBand';
import Login from './pages/login';

import Navigation from './pages/components/navigation';

const useRoutes = isAuthenticated => {
  const AuthenticatedRoutes = (
    <Router>
      {/* <Suspense fallback={<Loading/>}> */}
        <Routes>
          <Route path="/*" element={<Tasks />} />
          <Route path="/play" element={<Play />} />
          <Route path="/band" element={<MyBand />} />
        </Routes>
      {/* </Suspense> */}
      <Navigation/>
    </Router>
  );

  const UnauthenticatedRoutes = (
    // <Suspense fallback={<Loading/>}>
      <Router>
        <Routes>
          <Route path="/*" element={<Login />} />
        </Routes>
      </Router>
    // </Suspense>
  );

  return isAuthenticated ? AuthenticatedRoutes : UnauthenticatedRoutes;
};

export default useRoutes;