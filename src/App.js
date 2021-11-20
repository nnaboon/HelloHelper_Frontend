/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx, useTheme } from '@emotion/react'
import { LandingPage } from "./pages/Landing";
import { HomePage } from 'pages/Homepage';
import { RequestCard } from "features/request/RequestCard";
import { Sidebar } from './components/Sidebar/Sidebar';
import { TrendHashtag } from './features/trend/TrendHashtag';
import { Navbar } from 'components/Navbar/Navbar';
import { Router } from 'react-router-dom'
import OrangeCircle from './images/circle-orange-background.png';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

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
        </Switch>        
      </BrowserRouter>
    </div>
  );
}

export default App;
