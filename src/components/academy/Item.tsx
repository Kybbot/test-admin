import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Post } from '@/store/reducers/academy';
import CheckIcon from '@/components/common/icons/CheckIcon';
import { Link } from 'react-router-dom';

import getPhoto from '@/utils/getPhoto';
import { useSelector } from 'react-redux';
import { selectUsers } from '@/store/selectors/users';

interface Props {
  post: Post;
}

const Item: React.FC<Props> = ({
  post,
}) => {
  const users = useSelector(selectUsers);
  const author = users?.find((user) => user._id === post.author);
  if (!author) return null;
  return (
    <ItemWrap to={`/academy/${post.id}`}>
      <TitleWrap>
        <SubText>
          {post.title}
        </SubText>
        <TagsWrap>
          {post.tags.map((tag) => (
            <TagItem key={tag}>
              <CheckIconWrap>
                <CheckIcon color="#188038" />
              </CheckIconWrap>
              {tag}
            </TagItem>
          ))}
        </TagsWrap>
        <Author>
          <AuthorPhoto url={getPhoto(author.smallPhoto)} />
          <AuthorName>{author.name}</AuthorName>
        </Author>
      </TitleWrap>
      <Line style={{ marginLeft: '-10px' }} />
      <MiddleWrap>
        <SubTextDate>
          {`${moment(post.date).format('D MMM YYYY')}`}
        </SubTextDate>
      </MiddleWrap>
    </ItemWrap>
  );
};

const ItemWrap = styled(Link)`
  display: block;
  position: relative;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  min-height: 61px;
  padding: 6px 10px;
  margin: 8px 16px;
  cursor: pointer;
  text-decoration: none;
`;

const TitleWrap = styled.div`
  position: relative;
  margin: 3px 0 8px 0;
`;

const MiddleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  user-select: none;
  padding-top: 6px;
`;

const SubText = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  white-space: pre-line;
  margin-bottom: 8px;
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
`;

const Line = styled.div`
  width: calc(100% + 20px); 
  height: 1px;
  background-color: #ebeced;
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

const TagsWrap = styled.div`
  margin: 0 -5px;
`;

const Author = styled.div`
  align-items: center;
  display: flex;
  margin-top: 8px;
`;

const AuthorName = styled.div`
  font-size: 12px;
  font-weight: 400;
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
  width: 16px;
  height: 16px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 4px;
  background-position: center;
`;

export default Item;
