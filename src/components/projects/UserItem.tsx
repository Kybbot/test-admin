import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Teammate, TeammateStatus } from '@/store/reducers/projects';
import { editTeammate, getProjectsHours, getProjectsTags } from '@/store/actions/projects';
import { selectProject, selectProjectsHours, selectProjectsTags } from '@/store/selectors/projects';

import useToggle from '@/components/common/hooks/useToggle';
import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';

import getPhoto from '@/utils/getPhoto';

import MoreIcon from '@/components/common/icons/MoreIcon';

interface Props {
  teammate: Teammate;
  projectId: number;
  isAdmin: boolean;
}

const UserItem: React.FC<Props> = ({
  teammate,
  isAdmin,
}) => {
  const { user, userInfo } = teammate;
  const [tag, setTag] = useState(userInfo.tag);
  const [hours, setHours] = useState(userInfo.hours);
  const [status, setStatus] = useState<TeammateStatus>(userInfo.status);
  const [isActiveModalTags, toggleIsActiveModalTags] = useToggle();
  const [isWasOpened, setIsWasOpened] = useToggle();
  const selectRef = useOnClickOutside(() => toggleIsActiveModalTags(false));

  const dispatch = useDispatch();
  const history = useHistory();
  const project = useSelector(selectProject);
  const projectsTags = useSelector(selectProjectsTags);
  const projectsHours = useSelector(selectProjectsHours);

  useEffect(() => {
    if (!projectsTags) dispatch(getProjectsTags());
    if (!projectsHours) dispatch(getProjectsHours());
  }, []);

  useEffect(() => {
    if (isActiveModalTags) {
      setIsWasOpened(true);
    } else if (isWasOpened) {
      const body = {
        projectId: project!._id,
        userId: user._id,
        status,
        tag,
        hours,
      };

      dispatch(editTeammate(body, userInfo._id));
    }
  }, [isActiveModalTags]);

  const handleGoToUser = () => {
    history.push(`/users/${user._id}`);
  };

  const getIndicatorColor = () => {
    switch (status) {
      case TeammateStatus.ACTIVE: return '#64bf6a';
      case TeammateStatus.SUPPORT: return '#feaa22';
      default: return '#909599';
    }
  };

  const getUserInfoString = () => {
    if (!tag && hours) return `${hours} h`;
    if (tag && !hours) return `${tag}`;
    return `${tag} \u00A0 | \u00A0 ${hours} h`;
  };

  return (
    <ItemWrap>
      <ItemInfo>
        <LinkUser onClick={handleGoToUser} style={{ cursor: 'pointer' }}>
          <Photo url={getPhoto(user.smallPhoto)}>
            <StatusIndicator color={getIndicatorColor()} />
          </Photo>
          <SmallWrap>
            <NameItem isColor>{user!.name}</NameItem>
            <UserInfo>{getUserInfoString()}</UserInfo>
          </SmallWrap>
        </LinkUser>
      </ItemInfo>
      <LinkUser>
        {
          isAdmin && (
            <>
              <InfoSwitcherStyledWrapper ref={selectRef}>
                <InfoSwitcherStyled
                  isActive={isActiveModalTags}
                  onClick={toggleIsActiveModalTags}
                >
                  <MoreIcon />
                </InfoSwitcherStyled>

                {isActiveModalTags && (
                  <DropDownWrapper>
                    <DropDownMonth>
                      {projectsTags!.map((userTag) => (
                        <DropDownItems
                          onClick={() => setTag(userTag)}
                          key={userTag}
                          statusHover={userTag === tag}
                        >
                          {userTag}
                        </DropDownItems>
                      ))}
                    </DropDownMonth>
                    <DropDownYear>
                      {projectsHours!.map((value, index) => {
                        if (index) {
                          return (
                            <DropDownItems
                              onClick={() => setHours(value)}
                              style={{ textTransform: 'lowercase' }}
                              key={value}
                              statusHover={value === hours}
                            >
                              {`${value} h`}
                            </DropDownItems>
                          );
                        }

                        return null;
                      })}
                    </DropDownYear>
                    <DropDownStatus>
                      {Object.values(TeammateStatus).map((teammateStatus) => (
                        <DropDownItems
                          onClick={() => setStatus(teammateStatus)}
                          key={teammateStatus}
                          statusHover={status === teammateStatus}
                        >
                          {teammateStatus}
                        </DropDownItems>
                      ))}
                    </DropDownStatus>
                  </DropDownWrapper>
                )}
              </InfoSwitcherStyledWrapper>
            </>
          )
        }
      </LinkUser>
    </ItemWrap>
  );
};

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const ItemInfo = styled.div`
  width: 100%;
`;

const SmallWrap = styled.div`
  width: 100%;
`;

const NameItem = styled.div<{isColor: boolean}>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => (isColor ? '#21272e' : '#909599')};
  word-break: break-word;
  text-transform: capitalize;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 5px;


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ItemWrap = styled.div`
  min-height: 62px;
  position: relative;
  padding: 8px 10px;
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
`;

const Photo = styled.div<{url: string}>`
  width: 43px;
  height: 43px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 10px;
  background-position: center;
  flex-shrink: 0;
  position: relative;
`;

const InfoSwitcherStyledWrapper = styled.div`
  height: 36px;
`;

const DropDownWrapper = styled.div`
  display: flex;
  position: absolute;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.22);
  border: solid 1px #dae1e8;
  border-radius: 8px;
  top: 70px;
  left: 0;
  z-index: 80;
  width: 100%;
`;

const DropDownItems = styled.div<{statusHover: boolean}>`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 44px;
  letter-spacing: normal;
  color: #21272e;
  justify-content: center;
  height: 44px;
  background-color: ${({ statusHover }) => (statusHover ? '#f5f6f7' : '#ffffff')};
  display: flex;
  align-items: center;
  text-transform: capitalize;
  height: 30px;
  border-radius: 5px;
  flex-shrink: 0;
  user-select: none;
  cursor: pointer;
`;

const DropDownMonth = styled.div`
  padding: 10px;
  background-color: #ffffff;
  overflow: auto;
  width: 100%;
  border-right: 0;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  border-radius: 8px 0 0 8px;
`;

const DropDownYear = styled.div`
  padding: 10px;
  background-color: #ffffff;
  overflow: auto;
  width: 100%;
  border-right: 0;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
`;

const DropDownStatus = styled.div`
  padding: 10px;
  background-color: #ffffff;
  overflow: auto;
  width: 100%;
  border-right: 0;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  border-radius: 0 8px 8px 0;
`;

const InfoSwitcherStyled = styled.div<{ isActive: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: ${({ isActive }) => (isActive ? '0px 0px 0px 2px #3897ff' : '0px 0px 0px 1px #dae1e8')};

  font-size: 13px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  white-space: nowrap;
  color: #21272e;
  cursor: pointer;
  transform: rotate(90deg);
  margin-right: 5px;
`;

const UserInfo = styled.div`
  font-size: 12px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: #787c80;
  word-break: break-word;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const StatusIndicator = styled.div<{color: string}>`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px; 
  border-radius: 100%;
  border: 2px solid #fbfbfb;
  background: ${({ color }) => (color)};
`;

export default UserItem;
