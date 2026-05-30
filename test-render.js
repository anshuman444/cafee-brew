const React = require('react');
global.React = React;
const ReactDOMServer = require('react-dom/server');

// Mock next/image and next/link
const mockComponent = (name) => {
  return (props) => {
    return React.createElement(name, props, props.children);
  };
};
require('module').prototype.require = function (path) {
  if (path === 'next/image') {
    return mockComponent('img');
  }
  if (path === 'next/link') {
    return mockComponent('a');
  }
  return module.constructor._load(path, this);
};

// Now import the components
const LiveEventsPage = require('./app/events/page.tsx').default;
const ReservationPage = require('./app/reservation/page.tsx').default;

try {
  console.log("Rendering LiveEventsPage...");
  const eventsHtml = ReactDOMServer.renderToString(React.createElement(LiveEventsPage));
  console.log("LiveEventsPage rendered successfully! Length:", eventsHtml.length);
} catch (e) {
  console.error("Failed to render LiveEventsPage:", e);
}

try {
  console.log("Rendering ReservationPage...");
  const reservationHtml = ReactDOMServer.renderToString(React.createElement(ReservationPage));
  console.log("ReservationPage rendered successfully! Length:", reservationHtml.length);
} catch (e) {
  console.error("Failed to render ReservationPage:", e);
}
