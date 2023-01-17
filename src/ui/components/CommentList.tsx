import React from 'react';
import styled from 'styled-components';
import { CommentItemProps } from '../../lib/types/commentItem.interface';

interface Props {
  comments: CommentItemProps[];
  onDelete: (id: number) => void;
  getComment: any;
  loading: boolean;
}

const CommentList = ({ loading, comments, getComment, onDelete }: Props) => {
  if (loading) {
    return <div style={{ width: '100%', textAlign: 'center', padding: '50px 0' }}>Loading...</div>;
  }

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id}>
          <img src={comment.profile_url} alt='profile' />

          {comment.author}

          <CreatedAt>{comment.createdAt}</CreatedAt>

          <Content>{comment.content}</Content>

          <Button>
            <a
              onClick={() => getComment(comment.id)}>수정</a>
            <a onClick={() => onDelete(comment.id as number)}>삭제</a>
          </Button>

          <hr />
        </Comment>
      ))
      }
    </>
  );
};

export default CommentList;

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const Button = styled.div`
  text-align: right;
  margin: 10px 0;

  & > a {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
