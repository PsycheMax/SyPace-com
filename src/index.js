import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './components/fonts.css';
import PicturePage from './components/pages/picturePage/PicturePage';
import AboutPage from './components/pages/about/AboutPage';
import NotFound404 from './components/pages/404';
import ContentContainer from './components/pages/homepage/ContentContainer';
import HomePage from './components/pages/homepage/Homepage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="" element={<ContentContainer />} />
        <Route path="pic/:picID" element={<PicturePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
