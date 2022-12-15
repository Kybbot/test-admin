import React from 'react';
import Item from '@/components/academy/Item';
import { Post } from '@/store/reducers/academy';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  posts: Post[];
}

const Catalog: React.FC<ModalProps> = ({
  posts,
}) => (
  <div>
    {posts.map((post) => (
      <Item
        key={post.id}
        post={post}
      />
    )).sort((a, b) => b.props.post.date - a.props.post.date)}
  </div>
);

export default Catalog;
