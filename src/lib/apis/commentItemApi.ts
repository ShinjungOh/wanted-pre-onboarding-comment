import { client } from './client';
import { CommentItemProps } from '../types/commentItem.interface';

export const getComments = async () => {
  const url = '/';
  return await client.get(url);
};

export const createComment = async ({ profile, author, content, createdAt }: CommentItemProps) => {
  const url = '/';
  const data = {
    profile, author, content, createdAt,
  };
  await client.post(url, data);
};

export const updateComment = async (id: number) => {
  const url = `/${id}`;
  const data = {};
  await client.put(url, data);
};

export const deleteComment = async (id: number) => {
  const url = `/${id}`;
  await client.delete(url);
};
