import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SUGGESTED_REQUEST_DATA } from 'data/request';
import { POPULAR_REQUEST_DATA } from 'data/helper';
import { HelpMenu } from 'components/Menu/const';
import { RequestInfoContent } from 'components/Info/RequestInfoContent';
import { ProvideInfoContent } from 'components/Info/ProvideInfoContent';

export const InfoPage = () => {
  const [menu, setMenu] = useState<HelpMenu>(HelpMenu.REQUEST);
  const { state } = useLocation();
  const currentMenu = ((state as any)?.type || HelpMenu.REQUEST) as HelpMenu;

  useEffect(() => {
    console.log(state);
    setMenu(currentMenu);
  }, [currentMenu]);

  switch (menu) {
    case HelpMenu.PROVIDE:
      return <ProvideInfoContent data={POPULAR_REQUEST_DATA} />;
    case HelpMenu.REQUEST:
      return <RequestInfoContent data={SUGGESTED_REQUEST_DATA} />;
  }
};
