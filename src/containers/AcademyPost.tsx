import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import moment from 'moment';

import getPhoto from '@/utils/getPhoto';

import { selectPost } from '@/store/selectors/academy';
import { selectUser } from '@/store/selectors/user';
import {
  cleanAcademy,
  cleanAcademyPost,
  deletePost,
  getPost,
} from '@/store/actions/academy';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import BackIcon from '@/components/common/icons/BackIcon';
import CheckIcon from '@/components/common/icons/CheckIcon';
import EditIcon from '@/components/common/icons/EditIcon';
import BinIcon from '@/components/common/icons/BinIcon';
import LinkIconI from '@/components/common/icons/LinkIcon';
import FileIcon from '@/components/common/icons/FileIcon';
import ModalDelete from '@/components/academy/ModalDelete';
import Loader from '@/components/common/Loader';
import { cleanUsers, getUsersWithManagers } from '@/store/actions/users';
import { selectUsers } from '@/store/selectors/users';

interface Props extends RouteComponentProps<{ postId: string }> {}

const AcademyPost: React.FC<Props> = ({ match, history }) => {
  const { postId } = match.params;
  const [isDeleteModalActive, setIsDeleteModalActive] = useToggle();

  const [{ common }] = useLanguage();
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const user = useSelector(selectUser);
  const users = useSelector(selectUsers);
  let author = null;
  useEffect(() => {
    if (!users) {
      dispatch(getUsersWithManagers());
    }
    dispatch(getPost(+postId));
    return () => {
      dispatch(cleanAcademyPost());
      if (!history.location.pathname.includes('academy')) {
        dispatch(cleanUsers());
        dispatch(cleanAcademy());
      }
    };
  }, []);

  const handleGoToLink = (link: string) => () => {
    let url = link;

    if (!link.match(/^https?:\/\//i)) {
      url = `https://${link}`;
    }

    window.open(url, '_blank')!.focus();
  };

  const handleGoToFile = (fileName: string) => () => {
    window.open(`${process.env.BASE_URL}${fileName}`, '_blank')!.focus();
  };

  const handleEditClick = () => history.push(`/edit-post/${postId}`);

  const handleDelete = () => dispatch(deletePost(+postId));
  if (users && post) {
    author = users.find((u) => u._id === post.author);
  }
  if (!author) {
    return null;
  }
  return (
    <>
      {
        !post || !user
          ? <Loader />
          : (
            <>
              <Header>
                <HeaderWrap>
                  <HeaderSmallWrap>
                    <AddItemsTitle>
                      <TopButton onClick={history.goBack}>
                        <BackIcon />
                      </TopButton>
                      {post.title}
                    </AddItemsTitle>
                  </HeaderSmallWrap>
                </HeaderWrap>
                <TagsWrap>
                  {post.tags.map((tag) => (
                    <TagItem key={tag}>
                      <CheckIconWrap>
                        <CheckIcon color="#188038" />
                      </CheckIconWrap>
                      {tag}
                    </TagItem>
                  ))}
                  <Difficulty>
                    {`Difficulty: ${post.difficulty}`}
                  </Difficulty>
                </TagsWrap>
                <InfoWrap>
                  <Author to={`/users/${author._id}`}>
                    <AuthorPhoto url={getPhoto(author.smallPhoto)} />
                    <AuthorName>{`${author.name} ·`}</AuthorName>
                  </Author>
                  <SubTextDate>
                    {`\u00A0${moment(post.date).format('D MMM YYYY')}`}
                  </SubTextDate>
                </InfoWrap>
              </Header>
              <MainWrap focus>
                {Boolean(post.description) && (
                  <Description>
                    {post.description}
                  </Description>
                )}
                {post.links.map((link) => (
                  <LinkItem key={link} onClick={handleGoToLink(link)}>
                    <LinkIconWrap>
                      <LinkIconI color="black" />
                    </LinkIconWrap>
                    <LinkName>
                      {link}
                    </LinkName>
                  </LinkItem>
                ))}
                {post.filePaths.map((path) => (
                  <LinkItem key={path} onClick={handleGoToFile(path)}>
                    <LinkIconWrap>
                      <FileIcon color="black" />
                    </LinkIconWrap>
                    <LinkName>
                      {path}
                    </LinkName>
                  </LinkItem>
                ))}
                {(user._id === author._id || user.role === 'admin') && (
                  <>
                    <EditButton onClick={handleEditClick}>
                      <LinkIcon>
                        <EditIcon color="#feaa22" />
                      </LinkIcon>
                      {common.edit_post}
                    </EditButton>
                    <DeleteButton onClick={() => setIsDeleteModalActive(true)}>
                      <LinkIcon>
                        <BinIcon color="#feaa22" />
                      </LinkIcon>
                      {common.delete_post}
                    </DeleteButton>
                  </>
                )}
                {isDeleteModalActive && (
                  <ModalDelete
                    hideModal={setIsDeleteModalActive}
                    deleteHandle={handleDelete}
                  />
                )}
              </MainWrap>
            </>
          )
      }
    </>
  );
};

const MainWrap = styled.div<{focus: boolean}>`
  padding: 0 16px 52px;
  padding-bottom: 80px;
  background: white;
`;

const HeaderSmallWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AddItemsTitle = styled.div`
  display: flex;
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  letter-spacing: 0.3px;
`;

const Header = styled.header`
  background-color: #ffffff;
  padding: 24px 16px 24px;
  width: 100%;
  position: relative;
`;

const HeaderWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 120;
`;

const TagItem = styled.div`
  display: inline-block;
  height: 24px;
  position: relative;
  font-size: 11px;
  font-weight: 500;
  margin: 3px 5px;
  padding: 4px 10px 4px 22px;
  background: #d1d2d45c;
  text-decoration: none;
  border-radius: 5px;
  text-transform: capitalize;
  position: relative;
  cursor: default;
  user-select: none;
`;

const CheckIconWrap = styled.div`
  position: absolute;
  top: 4px;
  left: 5px;
  width: 16px;
  height: 16px;
`;

const Author = styled(Link)`
  text-decoration: none;
  align-items: center;
  display: flex;
`;

const AuthorName = styled.div`
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: #787c80;
  word-break: break-word;
  text-transform: capitalize;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  font-weight: 500;
  height: 20px;
  margin-top: 3px;


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const AuthorPhoto = styled.div<{url: string}>`
  width: 20px;
  height: 20px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 4px;
  background-position: center;
`;

const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;

const SubTextDate = styled.p`
  display: flex;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #787c80;
  margin-top: 3px;
  height: 20px;
`;

const Description = styled.div`
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  white-space: pre-line;
  margin-bottom: 24px;
`;

const TopButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: black;
  width: 40px;
  cursor: pointer;
  float: left;
  margin-right: 1px;
  flex-shrink: 0;
`;

const TagsWrap = styled.div`
  margin: 12px -5px 0 -5px;
`;

const LinkItem = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  text-decoration: underline;
  cursor: pointer;
  word-break: keep-all;
  overflow: hidden;
`;

const LinkIconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const LinkName = styled.p`
  word-break: keep-all;
  white-space: nowrap;
  overflow: auto;
`;

const Difficulty = styled.div`
  display: inline-block;
  height: 24px;
  position: relative;
  font-size: 11px;
  font-weight: 500;
  margin: 3px 5px;
  padding: 4px 10px 4px 10px;
  background: #d1d2d45c;
  text-decoration: none;
  border-radius: 5px;
  cursor: default;
  user-select: none;
`;

const DeleteButton = styled.div`
  position: relative;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 0 15px;
  color: #feaa22;
  user-select: none;
  cursor: pointer;
  align-items: center;
`;

const EditButton = styled.div`
  position: relative;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 0 15px;
  color: #feaa22;
  user-select: none;
  cursor: pointer;
  align-items: center;
  margin-top: 40px;
`;

const LinkIcon = styled.div`
  margin-right: 24px;
  height: 24px;
  width: 24px;
`;

export default AcademyPost;
