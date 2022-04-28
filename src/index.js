import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './components/fonts.css';
import PicturePage from './components/pages/picturePage/PicturePage';
import AboutPage from './components/pages/about/AboutPage';
import NotFound404 from './components/pages/404';
import HomePage from './components/pages/homepage/Homepage';
import ScrollList from './components/pages/homepage/ScrollList/ScrollList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="" element={<ScrollList />} />
        <Route path="pic/:picID" element={<PicturePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  </BrowserRouter>
);