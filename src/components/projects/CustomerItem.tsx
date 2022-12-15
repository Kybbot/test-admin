import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { User } from '@/store/reducers/user';

import { deleteCustomerFromProject } from '@/store/actions/projects';

import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import useToggle from '@/components/common/hooks/useToggle';
import ModalDelete from '@/components/users/ModalDelete';

import getPhoto from '@/utils/getPhoto';
import { useHistory } from 'react-router';

interface Props {
  customer: User;
  projectId: number;
  isAdmin: boolean;
  onClick?: () => void;
}

const CustomerItem: React.FC<Props> = ({
  customer,
  projectId,
  isAdmin,
  onClick,
}) => {
  const [isActiveModalDelete, toggleIsActiveModalDelete] = useToggle();

  const dispatch = useDispatch();
  const history = useHistory();
  const handleDelete = () => {
    dispatch(deleteCustomerFromProject(projectId, customer._id));
  };

  const handleClick = () => {
    if (isAdmin) {
      if (onClick) {
        onClick();
      }
      history.push(`/customers/${customer._id}`);
    }
  };

  const deleteHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleIsActiveModalDelete(e);
  };

  return (
    <>
      <ItemWrap onClick={handleClick}>
        <ItemInfo>
          <LinkUser>
            <Photo url={getPhoto(customer.smallPhoto)} />
            <NameItem isColor>{customer!.name}</NameItem>
          </LinkUser>
        </ItemInfo>
        <LinkUser>
          {
          isAdmin && (
            <RightArrow onClick={deleteHandler}>
              <PlusIcon stroke="#909599" width="20px" height="20px" />
            </RightArrow>
          )
        }
        </LinkUser>
      </ItemWrap>
      {isActiveModalDelete && (
      <ModalDelete
        deleteHandle={handleDelete}
        hideModal={toggleIsActiveModalDelete}
      />
      )}
    </>
  );
};

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const RightArrow = styled.div`
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
`;

const ItemInfo = styled.div`
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
  padding: 8px 10px;
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
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
`;

export default CustomerItem;
