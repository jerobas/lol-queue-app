import React from 'react';
import { lazy } from 'react';
import { Pages } from '../interfaces';

// Lazy-load all page components
const pages = import.meta.glob('./**/*.tsx');

// Convert the glob object into actual routes
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

export const routes = generateRoutes();