import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';

import { HandleToggle } from '@/components/common/hooks/useToggle';
import { Vacation } from '@/store/reducers/vacations';

import useLanguage from '@/components/common/hooks/useLanguage';
import Select from '@/components/vacations/Select';
import ProjectsIcon from '@/components/common/icons/navigation/projectsIcon';
import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';

import getPhoto from '@/utils/getPhoto';
import { selectProjects } from '@/store/selectors/projects';
import { selectUsers } from '@/store/selectors/users';

interface Props {
  vacation: Vacation;
  openApproveModal: HandleToggle
  openRejectModal: HandleToggle
  withButtons?: boolean;
}

const ItemVacation: React.FC<Props> = ({
  vacation,
  openRejectModal,
  openApproveModal,
  withButtons = true,
}) => {
  const { userId } = vacation;
  const users = useSelector(selectUsers);

  const user = users?.find((u) => u._id === userId);

  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  const [{ common, inputsPages }] = useLanguage();

  if (!user) return null;

  const getCountDaysString = () => {
    if (vacation.usedDays === 1) return 'Request 1 day vacation';

    return `Request ${vacation.usedDays} days vacation`;
  };

  const handleClick = () => {
    dispatch(push(`/actions/${vacation._id}`));
  };

  const handleUserClick = () => {
    dispatch(push(`/users/${user._id}`));
  };

  const handleProjectClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    e.stopPropagation();
    dispatch(push(`/projects/${id}`));
  };

  return (
    <Select
      onClick={handleClick}
      photo={getPhoto(user?.smallPhoto)}
      title={user?.name}
      text={getCountDaysString()}
      isSelectOpen
      withButton={false}
      userClick={handleUserClick}
      selectContent={(
        <Wrapper>
          <ContentWrap>
            <Content>
              <Title>{inputsPages.vacation_start}</Title>
            </Content>
            <RightContent>
              <UnitText>{moment(vacation.startDate).format('DD/MM/YYYY')}</UnitText>
            </RightContent>
          </ContentWrap>
          <ContentWrap>
            <Content>
              <Title>{inputsPages.vacation_end}</Title>
            </Content>
            <RightContent>
              <UnitText>{moment(vacation.endDate).format('DD/MM/YYYY')}</UnitText>
            </RightContent>
          </ContentWrap>
          {Boolean(vacation.comment) && (
            <ContentWrap>
              <Content>
                <Title>{inputsPages.comment}</Title>
              </Content>
              <RightContent>
                <UnitText>{vacation.comment}</UnitText>
              </RightContent>
            </ContentWrap>
          )}
          {withButtons && (
            <ContentWrap>
              <Content>
                <Title>{inputsPages.available_days}</Title>
              </Content>
              <RightContent>
                <UnitText>{vacation.availableDays}</UnitText>
              </RightContent>
            </ContentWrap>
          )}
          <ContentWrap>
            <Content>
              <Title>{common.projects}</Title>
            </Content>
            <RightContent>
              <UnitText>{vacation.projects.length > 0 ? '' : 'None'}</UnitText>
            </RightContent>
          </ContentWrap>
          <Empty />
          {
            Boolean(vacation.projects) && (
              vacation.projects.map((vacationProject) => {
                const project = projects?.find((p) => p._id === vacationProject);
                if (!project) return null;
                return (
                  <SectionWrapper key={project._id}>
                    <Line />
                    <ProjectItemInfo onClick={(e) => handleProjectClick(e, project._id)}>
                      <LinkUser>
                        <ProjectIconWrap>
                          <ProjectsIcon color="#333" />
                        </ProjectIconWrap>
                        <TextWrap>
                          <NameItem isColor>
                            {project.name}
                          </NameItem>
                        </TextWrap>
                      </LinkUser>
                      <RightArrow>
                        <SmallArrowIcon />
                      </RightArrow>
                    </ProjectItemInfo>
                  </SectionWrapper>
                );
              })
            )
          }
          {
            withButtons && (
              <>
                <Line />
                <ButtonsWrap>
                  <Button onClick={openRejectModal}>
                    {common.reject}
                  </Button>
                  <Button onClick={openApproveModal}>
                    {common.approve}
                  </Button>
                </ButtonsWrap>
              </>
            )
          }
        </Wrapper>
      )}
    />
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 64px;
  background-color: rgba(255, 255, 255, 0);
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px 0px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 10px;
  justify-content: center;
  margin-top: 0;
`;

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 6px;
`;

const Button = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: rgb(56, 151, 255);
  text-transform: uppercase;
  margin-left: 20px;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-top: 10px;
  justify-content: center;
  margin-top: 0;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  text-transform: capitalize;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const UnitText = styled.span`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  text-transform: capitalize;
`;

const Line = styled.div`
  width: calc(100% + 20px);
  height: 1px;
  background-color: #ebeced;
  margin-left: -10px;
`;

const ProjectItemInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 6px 0px 6px 0px;
  text-decoration: none;

  &:last-child {
    padding-bottom: 0px;
    margin-bottom: 6px;
  }
`;

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const ProjectIconWrap = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 5px;
  border: 1.7px solid rgba(33, 39, 46, 0.08);
  font-size: 15px;
  font-weight: 600;
  background-color: #f0f1f2;
  margin-right: 10px;
  text-transform: uppercase;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  word-break: normal;
  padding: 3px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
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


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const RightArrow = styled.div`
  width: 16px;
  height: 16px;
  margin-bottom: 2px;
`;

const Empty = styled.div`
  width: 100%;
  height: 10px;
`;

const SectionWrapper = styled.div`
  width: 100%;
`;

export default ItemVacation;
