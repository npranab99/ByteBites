import React, { Suspense } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import routePath from './utils/routePath';
import Menu from './components/Menu';
//**Lazy Loading**

const About = React.lazy(()=> import('./components/About'));
const Resturents = React.lazy(()=> import('./components/Body'))
const UserRegistration =React.lazy(()=>import('./components/UserRegistration'))
const ItemCart = React.lazy(()=>import('./components/ItemCart'))

const AppRoutes = () => {

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>

		<Route path={"/"} element={<Navigate to={routePath.home} replace />}/>
        <Route exact path={routePath.home} element={<Resturents />} />
        <Route exact path={routePath.about} element={<About />} />
        <Route exact path={routePath.menu} element={<Menu />} />
        <Route exact path={routePath.cart} element={<ItemCart/>}/>
        <Route exact path={routePath.login} element={<Suspense fallback={<h2>loading...</h2>}><UserRegistration/></Suspense>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
