/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx, useTheme } from '@emotion/react'
import Dashboard from "./pages/Dashboard";
import { RequestCard } from "features/request/RequestCard";
import { Sidebar } from './components/Sidebar/Sidebar';
import { TrendHashtag } from './features/trend/TrendHashtag';
import { Navbar } from 'components/Navbar/Navbar';
import { Router } from 'react-router-dom'

function App() {
  return (
    <div style={{ height: '100vh'}}>
      <Navbar />
      <div
        css={css`
          position: relative;
          top: 56px;
          display: flex;
        `}
      >
        <Sidebar />
        <RequestCard />
        <TrendHashtag />
      </div>      
    </div>


  );
}

export default App;
