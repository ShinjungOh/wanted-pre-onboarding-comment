import React, { ChangeEvent, useEffect, useState } from 'react';
import CommentList from '../components/CommentList';
import PageList from '../components/PageList';
import Form from '../components/Form';
import { CommentItemProps } from '../../lib/types/commentItem.interface';
import { createComment, getComments } from '../../lib/apis/commentItemApi';

const CommentPage = () => {
  const [createCommentItem, setCreateCommentItem] = useState({
    profile: '',
    author: '',
    content: '',
    createdAt: '',
  });
  const [comments, setComments] = useState<CommentItemProps[]>([]);

  const getCommentsItem = async () => {
    try {
      const response = await getComments();
      setComments(response.data);
    } catch (e) {
      alert('목록 불러오기에 실패했습니다.');
      setComments([]);
    }
  };

  const onChangeCommentInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    console.log('value>>', value);
    console.log('name>>', name);
    setCreateCommentItem({
      ...createCommentItem,
      [name]: value
    })
  };

  const handleSubmitCommentItem = async () => {
    try {
      await createComment({
        profile: createCommentItem.profile,
        author: createCommentItem.author,
        content: createCommentItem.content,
        createdAt: createCommentItem.createdAt,
      });
    } catch (e) {
      alert('댓글 추가에 실패했습니다.');
    }
  };

  useEffect(() => {
    getCommentsItem();
  }, []);

  return (
    <>
      <CommentList comments={comments} />
      <PageList />
      <Form createCommentItem={createCommentItem} onChange={onChangeCommentInput} onSubmit={handleSubmitCommentItem} />
    </>
  );
};

export default CommentPage;
