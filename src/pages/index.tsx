import React from 'react';
import { lazy } from 'react';
import { Pages } from '../interfaces';
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

const pages = import.meta.glob('./**/*.tsx');

const generateRoutes = () => {
  const routes: Pages = {};

  Object.entries(pages).forEach(([path, resolver]) => {
    const [name, type] = path
      .replace('./', '')
      .replace('.tsx', '')
      .toLowerCase()
      .split('/');

    if (!routes[name]) {
      routes[name] = {};
    }

    routes[name][type] = React.createElement(lazy(resolver as any));
  });

  return routes;
}

const routes = generateRoutes();

const RoutesHandler = () => {
  return <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    }
  >
    <Routes>
      {Object.entries(routes).map(([name, route]) => (
        <Route
          key={name}
          path={name === "home" ? "/" : `/${name}`}
          element={route["index"]}
        />
      ))}
    </Routes>
  </Suspense>
}

export default RoutesHandler;
export { routes };