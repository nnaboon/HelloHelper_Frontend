/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { css, jsx } from '@emotion/react';
import { HomePage } from 'pages/Homepage';
import { ProfilePage } from 'pages/ProfilePage';
import { SearchResultPage } from './pages/SearchResultPage';
import { Navbar } from 'components/Navbar/Navbar';
import { ProvideListPage } from './pages/ProvideListpage';
import { RequestListPage } from './pages/RequestListpage';
import { EditProfilePage } from './pages/EditProfilePage';
import { CommunityPage } from './pages/CommunityPage';
import { CommunitySetting } from 'features/community/CommunitySetting';
import { mediaQueryMobile } from './styles/variables';
import Chat from 'features/chat/components/Chat/Chat';
import 'react-multi-carousel/lib/styles.css';
import './App.css';
import { ProvideInfoContent } from 'components/Info/ProvideInfoContent';
import { RequestInfoContent } from 'components/Info/RequestInfoContent';

const App = () => {
  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
        background: #f9f9f9;
        ${mediaQueryMobile} {
          overflow-y: hidden;
        }
      `}
    >
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/community/" component={CommunityPage} />
          <Route path="/user/community/:id" component={CommunitySetting} />
          <Route
            path="/user/account/profile"
            exact
            component={EditProfilePage}
          />
          <Route path="/chat" component={Chat} />
          <Route path="/order/request" exact component={RequestListPage} />
          <Route path="/order/provide" exact component={ProvideListPage} />
          <Route path="/:id" exact component={SearchResultPage} />
          <Route path="/search" exact component={SearchResultPage} />
          {/* <Route path="/:title/:id" component={InfoPage} /> */}
          <Route path="/provide/:title/:id" component={ProvideInfoContent} />
          <Route path="/request/:title/:id" component={RequestInfoContent} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
