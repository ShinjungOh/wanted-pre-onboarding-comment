import React, { ChangeEvent, useEffect, useState } from 'react';
import CommentList from '../components/CommentList';
import PageList from '../components/PageList';
import Form from '../components/Form';
import { CommentItemProps } from '../../lib/types/commentItem.interface';
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from '../../lib/apis/commentItemApi';

const CommentPage = () => {
  const [createCommentItem, setCreateCommentItem] = useState<CommentItemProps>({
    profile_url: '',
    author: '',
    content: '',
    createdAt: '',
  });
  const [comments, setComments] = useState<CommentItemProps[]>([]);
  const [isOpenToggle, setIsOpenToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(5);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComment = comments.slice(indexOfFirstComment, indexOfLastComment);

  const handlePaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onToggleUpdate = () => {
    setIsOpenToggle(((prev) => !prev));
  };

  const getCommentsItem = async () => {
    try {
      const response = await getComments();
      setComments(response.data);
    } catch (e) {
      alert('목록 불러오기에 실패했습니다.');
      setComments([]);
    }
  };

  const getCommentItem = async (id: number) => {
    try {
      const { data } = await getComment(id);
      setCreateCommentItem(data);
      onToggleUpdate();
    } catch (e) {
      alert('댓글 불러오기에 실패했습니다.');
    }
  };

  const onChangeCommentInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCreateCommentItem({
      ...createCommentItem,
      [name]: value,
    });
  };

  const handleSubmitCommentItem = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await createComment({
        profile_url: createCommentItem.profile_url,
        author: createCommentItem.author,
        content: createCommentItem.content,
        createdAt: createCommentItem.createdAt,
      });
      getCommentsItem();
      alert('댓글이 성공적으로 추가되었습니다!');
      setCreateCommentItem({
        author: '',
        content: '',
        createdAt: '',
        profile_url: '',
      });
    } catch (e) {
      alert('댓글 추가에 실패했습니다.');
    }
  };

  const handleUpdateCommentItem = async (comment: CommentItemProps) => {
    try {
      if (comment) {
        await updateComment(comment);
      }
    } catch (e) {
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleDeleteCommentItem = async (id: number) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm('정말 삭제하시겠습니까?');
      if (isConfirm) {
        await deleteComment(id);
        getCommentsItem();
        return;
      }
    } catch (e) {
      alert('댓글 삭제에 실패했습니다.');
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const response = await getComments();
      setComments(response.data);
      setLoading(false);
    };

    fetchComments();
  }, []);

  return (
    <>
      <CommentList
        comments={currentComment}
        loading={loading}
        onDelete={handleDeleteCommentItem}
        getComment={getCommentItem}
      />
      <PageList
        commentsPerPage={commentsPerPage}
        totalComments={comments.length}
        onPaginate={handlePaginate}
      />
      <Form
        createCommentItem={createCommentItem}
        isOpenToggle={isOpenToggle}
        onChange={onChangeCommentInput}
        onSubmit={handleSubmitCommentItem}
        onUpdate={handleUpdateCommentItem}
      />
    </>
  );
};

export default CommentPage;
