/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { css, jsx } from '@emotion/react';
import { HomePage } from 'pages/Homepage';
import { ProfilePage } from 'pages/ProfilePage';
import './App.css';
import { InfoPage } from 'pages/Infopage';
import { SearchResultPage } from './pages/SearchResultPage';
import { Navbar } from 'components/Navbar/Navbar';
import { ProvideListPage } from './pages/ProvideListpage';
import { RequestListPage } from './pages/RequestListpage';
import { EditProfilePage } from './pages/EditProfilePage';

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
          <Route path="/" exact component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/user/account/profile" component={EditProfilePage} />
          <Route path="/request" component={RequestListPage} />
          <Route path="/provide" component={ProvideListPage} />
          <Route path="/:id" exact component={SearchResultPage} />
          <Route path="/search" exact component={SearchResultPage} />
          <Route path="/:title/:id" component={InfoPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
