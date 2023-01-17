import { client } from './client';
import { CommentItemProps } from '../types/commentItem.interface';

export const getComments = async () => {
  const url = '/';
  return await client.get(url);
};

export const getComment = async (id: number) => {
  const url = `/${id}`;
  return await client.get(url);
}

export const createComment = async (comment: CommentItemProps) => {
  const url = '/';
  const { profile_url, author, content, createdAt } = comment;
  await client.post(url, { profile_url, author, content, createdAt });
};

export const updateComment = async (comment: CommentItemProps) => {
  const url = `/${comment.id}`;
  const { profile_url, author, content, createdAt } = comment;
  await client.put(url, { profile_url, author, content, createdAt });
};

export const deleteComment = async (id: number) => {
  const url = `/${id}`;
  await client.delete(url);
};
