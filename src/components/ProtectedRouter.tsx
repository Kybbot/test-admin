import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router';

import { selectIsAvailable, selectIsLoginPending, selectIsLoginResolved } from '@/store/selectors/auth';

import Loader from '@/components/common/Loader';
import { selectRole } from '@/store/selectors/user';
import { setSearchStatus } from '@/store/actions/search';
import { selectIsSearchActive } from '@/store/selectors/search';
import useKeyShortcut from './common/hooks/useKeyShortcut';
import Error from './Error';

const ProtectedRouter: React.FC<RouteProps> = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoginPending);
  const isLoggedIn = useSelector(selectIsLoginResolved);
  const isSearchOpen = useSelector(selectIsSearchActive);
  const isAvailable = useSelector(selectIsAvailable);
  const role = useSelector(selectRole);
  const { location } = props;

  const shortcutPress = useKeyShortcut('Meta', 'KeyK');

  useEffect(() => {
    if (shortcutPress && role === 'admin') {
      dispatch(setSearchStatus(!isSearchOpen));
    }
  }, [shortcutPress]);
  // if (isAvailable === false) return <Error />;

  if (isLoading) return <Loader />;

  return isLoggedIn ? <Route {...props} /> : <Redirect to={`/login${location?.pathname}`} />;
};

export default ProtectedRouter;
