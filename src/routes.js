/*
// React-router handles navigation between these application 'pages'
// (each page is really just an independent React component)
import AppHome from './components/home/AppHome';

// Application Page Components
import Page1 from './components/home/Page1';
import Page2 from './components/home/Page2';
import Page3 from './components/home/Page3';
import Page4 from './components/home/Page4';
import Page0 from './components/home/Page0';
//import Page5 from './containers/Page5';
import Page5 from './components/home/Page5';

// NotFound Component (404)
import NotFound from './components/404/NotFound';

module.exports = {
  routes : [
    { path: '/',
      component: AppHome,
      indexRoute: { components: Page0 },
      childRoutes : [
        { path: 'page0', components: Page0 },
        { path: 'page1', components: Page1 },
        { path: 'page2', components: Page2 },
        { path: 'page3', components: Page3 },
        { path: 'page4', components: Page4 },
		{ path: 'page5', components: Page5 },
        { path: 'not-found', components: NotFound } // keep this line for explicitly redirecting to a 404 page from web server (e.g. hapi.js)
      ]
    },
    {
      path: '*', // for all other routes not defined above, redirect to 404 page
      component: AppHome,
      indexRoute: { components: NotFound }
    }
  ]
};
*/