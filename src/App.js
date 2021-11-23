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
import { Login } from './pages/Login';
import { Navbar } from 'components/Navbar/Navbar';

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
        <Navbar />
        <Switch>
          {/* <Route path="" exact component={LandingPage} /> */}
          <Route path="/" exact component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/:id" exact component={SearchResultPage} />
          <Route path="/search" exact component={SearchResultPage} />
          <Route path="/:title/:id" component={InfoPage} />
         </Switch>        
      </BrowserRouter>
    </div>
  );
}

export default App;
