import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CommunityContent } from 'features/community/CommunityContent';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { Loading } from 'components/Loading/Loading';

export const CommunityPage = () => {
  const history = useHistory();
  useEffect(() => {
    if (window.localStorage.getItem('id') === null) {
      history.push('/');
    }
  }, []);
  return (
    <React.Fragment>
      {window.localStorage.getItem('id') ? (
        <CommunityContent />
      ) : (
        <WrapperContainer>
          <Loading />
        </WrapperContainer>
      )}
    </React.Fragment>
  );
};
