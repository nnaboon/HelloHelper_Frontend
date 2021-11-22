/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from '@emotion/styled';
import { css, jsx, useTheme } from '@emotion/react'
import { LandingPage } from "./pages/Landing";
import { HomePage } from 'pages/Homepage';
import { ProfilePage } from 'pages/ProfilePage';
import './App.css'
import { InfoPage } from 'pages/Infopage';
import { SearchResultPage } from './pages/SearchResultPage';
import { Sidebar } from './components/Sidebar/Sidebar';

function App() {
  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100vh;
      `}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/:id" exact component={SearchResultPage} />
          <Route path="/:title/:id" component={InfoPage} />
         </Switch>        
      </BrowserRouter>
    </div>
  );
}

export default App;
