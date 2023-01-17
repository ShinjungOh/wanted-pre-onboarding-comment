import React, { ChangeEvent, useEffect, useState } from 'react';
import CommentList from '../components/CommentList';
import PageList from '../components/PageList';
import Form from '../components/Form';
import { CommentItemProps } from '../../lib/types/commentItem.interface';
import { createComment, deleteComment, getComments } from '../../lib/apis/commentItemApi';

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
      [name]: value,
    });
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

  console.log(createCommentItem);

  const handleDeleteCommentItem = async (id: number) => {
    try {
      console.log(id);
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm('정말 삭제하시겠습니까?');
      if (isConfirm) {
        const response = await deleteComment(id);
        console.log(response);
        return;
      }
    } catch (e) {
      alert('댓글 삭제에 실패했습니다.');
      console.log(e);
    }
  };

  useEffect(() => {
    getCommentsItem();
  }, []);

  return (
    <>
      <CommentList comments={comments} onDelete={handleDeleteCommentItem} />
      <PageList />
      <Form createCommentItem={createCommentItem} onChange={onChangeCommentInput} onSubmit={handleSubmitCommentItem} />
    </>
  );
};

export default CommentPage;
