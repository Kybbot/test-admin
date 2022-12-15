import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { selectCustomer } from '@/store/selectors/customers';
import { selectProjects } from '@/store/selectors/projects';
import { getCustomer, cleanCustomer } from '@/store/actions/customers';
import { cleanProjects, getCustomerProjects } from '@/store/actions/projects';

import useLanguage from '@/components/common/hooks/useLanguage';
import BackIcon from '@/components/common/icons/BackIcon';
import EditIcon from '@/components/common/icons/EditIcon';
import LoaderDots from '@/components/common/LoaderDots';
import Loader from '@/components/common/Loader';
import Catalog from '@/components/customerProjects/Catalog';
import useToggle from '@/components/common/hooks/useToggle';
import ZapIcon from '@/components/common/icons/ZapIcon';
import List from '@/components/List';
import CreateReminder from '@/components/CreateReminder';
import getPhoto from '@/utils/getPhoto';

interface Props extends RouteComponentProps<{ customerId: string }> {}

const CustomerDetails: React.FC<Props> = ({ match, history }) => {
  const { customerId: id } = match.params;
  const [isCreateReminderActive, toggleIsCreateReminderActive] = useToggle();
  const dispatch = useDispatch();
  const customer = useSelector(selectCustomer);
  const projects = useSelector(selectProjects);

  const [{ mePage, inputsPages }] = useLanguage();

  useEffect(() => {
    dispatch(getCustomer(+id));
    dispatch(getCustomerProjects(+id));

    return () => {
      dispatch(cleanCustomer());
      dispatch(cleanProjects());
    };
  }, [id]);

  if (isCreateReminderActive) {
    return (
      <CreateReminder
        customer={customer!}
        hide={toggleIsCreateReminderActive}
      />
    );
  }

  const handleGoBack = () => history.goBack();

  return (
    <>
      <Header>
        <HeaderWrap>
          <HeaderSmallWrap>
            <TopButton onClick={handleGoBack}>
              <BackIcon />
            </TopButton>
            <AddItemsTitle>
              {
                !customer
                  ? <LoaderDots />
                  : (
                    customer.name
                  )
              }
            </AddItemsTitle>
          </HeaderSmallWrap>
          <HeaderRectangle to={`/edit-customer/${id}`}>
            <HeaderEdit>
              <EditIcon color="black" />
            </HeaderEdit>
          </HeaderRectangle>
        </HeaderWrap>
      </Header>
      <MainWrap focus className="scrollbar">
        {
          !customer || !projects
            ? <Loader />
            : (
              <>
                <UserPhoto photo={getPhoto(customer.photo)} />
                <SectionWrap>
                  <Tip spaceBetween={false}>
                    <SectionName>{mePage.info}</SectionName>
                  </Tip>
                  <Details>
                    <TextWrap>
                      <DetailsText>{inputsPages.customer_name}</DetailsText>
                      <DetailsSubText>{customer.name}</DetailsSubText>
                    </TextWrap>
                    {
                      Boolean(customer.birthday)
                      && (
                        <TextWrap>
                          <DetailsText>{mePage.birthday}</DetailsText>
                          <DetailsSubText>{moment(customer.birthday).format('DD/MM/YYYY')}</DetailsSubText>
                        </TextWrap>
                      )
                    }
                    {
                      Boolean(customer.email && customer.email[0])
                      && (
                        <TextWrap>
                          <DetailsText>{inputsPages.email}</DetailsText>
                          <DetailsSubText style={{ textTransform: 'none' }}>{customer.email[0]}</DetailsSubText>
                        </TextWrap>
                      )
                    }
                    {
                      Boolean(customer.email && customer.email[1])
                      && (
                        <TextWrap>
                          <DetailsText>{inputsPages.second_email}</DetailsText>
                          <DetailsSubText style={{ textTransform: 'none' }}>{customer.email[1]}</DetailsSubText>
                        </TextWrap>
                      )
                    }
                    {
                      Boolean(customer.linkedInProfile)
                      && (
                        <TextWrap>
                          <DetailsText>{inputsPages.linkedin}</DetailsText>
                          <DetailsSubText style={{ textTransform: 'none' }}>{customer.linkedInProfile}</DetailsSubText>
                        </TextWrap>
                      )
                    }
                  </Details>
                </SectionWrap>
                {Boolean(projects.length) && (
                  <SectionWrap>
                    <Tip spaceBetween={false}>
                      <SectionName>{mePage.projects}</SectionName>
                    </Tip>
                    <Catalog projects={projects} />
                  </SectionWrap>
                )}
                <SectionWrap>
                  <Tip spaceBetween={false}>
                    <SectionName>{mePage.other}</SectionName>
                  </Tip>
                  <List
                    leftIcon={<ZapIcon color="rgb(240, 158, 26)" />}
                    text={mePage.create_action}
                    variant={1}
                    onClick={() => toggleIsCreateReminderActive(true)}
                  />
                </SectionWrap>
              </>
            )
        }
      </MainWrap>
    </>
  );
};

const MainWrap = styled.div<{focus: boolean}>`
  padding: 0 16px 52px;
  padding-bottom: ${({ focus }) => focus && '20px'};
  background: white;
  height: 100%;
  overflow-y: auto;
`;

const HeaderSmallWrap = styled.div`
  display: flex;
  align-items: center;
`;

const AddItemsTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-left: 25px;
  letter-spacing: 0.3px;
  white-space: nowrap;
`;

const TopButton = styled.div`
  color: black;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Header = styled.header`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  position: sticky;
  z-index: 100;
  width: 100%;
  top: 0;
`;

const HeaderWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  z-index: 120;
`;

const DetailsText = styled.p`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #787c80;
`;

const DetailsSubText = styled.p`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #21272e;
  text-transform: capitalize;
`;

const Details = styled.div`
  padding: 10px 16px;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  margin: 0 0 16px;
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px;
`;

const UserPhoto = styled.div<{photo: string | undefined}>`
  margin: 16px auto;
  width: 250px;
  height: 250px;
  border-radius: 100%;
  background-image: ${({ photo }) => (`url('${photo}')`)};
  background-size: cover;
  border: solid 1px #dae1e8;
  background-position: center;
`;

const HeaderRectangle = styled(Link)`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color:#21272e;
`;

const HeaderEdit = styled.div`
  width: 24px;
  height: 24px;
`;

const Tip = styled.div<{spaceBetween: boolean}>`
  display: flex;
  justify-content: ${({ spaceBetween }) => (spaceBetween ? 'space-between' : 'flex-start')};
  margin-bottom: 10px;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const SectionWrap = styled.div`
  margin: 10px 0 32px;
`;

const SectionName = styled.div`
  margin-right: 10px;
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

export default CustomerDetails;
