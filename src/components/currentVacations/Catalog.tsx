import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Vacation } from '@/store/reducers/vacations';

import useLanguage from '@/components/common/hooks/useLanguage';
import Item from '@/components/currentVacations/Item';
import { getProjects } from '@/store/actions/projects';
import { getUsersWithManagers, cleanUsers } from '@/store/actions/users';
import { selectProjects } from '@/store/selectors/projects';
import { selectUsers } from '@/store/selectors/users';
import { useSelector, useDispatch } from 'react-redux';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  currentVacations: Vacation[] | null;
  futureVacations: Vacation[] | null;
  recentVacations: Vacation[] | null;
}

const Catalog: React.FC<ModalProps> = ({
  currentVacations,
  futureVacations,
  recentVacations,
}) => {
  const [{ common }] = useLanguage();
  const users = useSelector(selectUsers);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!users) {
      dispatch(getUsersWithManagers());
      dispatch(getProjects());
    }
    return (() => {
      dispatch(cleanUsers());
    });
  }, []);
  return (
    <Wrap>
      {
      users && projects && (
      <>
        {Boolean(currentVacations!.length) && (
        <>
          <TopWrap>
            <CountItems>
              {`${common.current} (${currentVacations?.length})`}
            </CountItems>
          </TopWrap>
          <ItemsWrap>
            {currentVacations?.map((vacation) => (
              <Item
                key={vacation._id}
                vacation={vacation}
              />
            ))}
          </ItemsWrap>
        </>
        )}
        {Boolean(futureVacations!.length) && (
        <>
          <TopWrap>
            <CountItems>
              {`${common.future} (${futureVacations?.length})`}
            </CountItems>
          </TopWrap>
          <ItemsWrap>
            {futureVacations?.map((vacation) => (
              <Item
                key={vacation._id}
                vacation={vacation}
              />
            ))}
          </ItemsWrap>
        </>
        )}
        {Boolean(recentVacations!.length) && (
        <>
          <TopWrap>
            <CountItems>
              {`${common.recent} (${recentVacations?.length})`}
            </CountItems>
          </TopWrap>
          <ItemsWrap>
            {recentVacations!.map((vacation) => (
              <Item
                key={vacation._id}
                vacation={vacation}
              />
            ))}
          </ItemsWrap>
        </>
        )}
      </>
      )
}
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 0 0 16px;
`;

const ItemsWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 8px;
  align-items: center;
`;

const CountItems = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.3px;
  color: #909599;
  white-space: nowrap;
`;

export default Catalog;
