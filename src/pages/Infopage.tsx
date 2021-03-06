import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { REQUEST_MAPPER } from 'data/request';
import { HelpMenu } from 'components/Menu/const';
import { RequestInfoContent } from 'components/Info/RequestInfoContent';
import { ProvideInfoContent } from 'components/Info/ProvideInfoContent';
import { PROVIDE_MAPPER } from 'data/provide';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';

export const InfoPage = () => {
  const [menu, setMenu] = useState<HelpMenu>(HelpMenu.PROVIDE);
  const { state } = useLocation();
  const currentMenu = (state as any)?.type as HelpMenu;

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  switch (menu) {
    case HelpMenu.PROVIDE:
      return <ProvideInfoContent data={PROVIDE_MAPPER} />;
    case HelpMenu.REQUEST:
      return <RequestInfoContent data={REQUEST_MAPPER} />;
  }
};
