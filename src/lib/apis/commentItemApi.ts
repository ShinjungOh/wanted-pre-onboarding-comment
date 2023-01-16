import { client } from './client';

export const getComments = async () => {
  const url = '/';
  return await client.get(url);
};

export const createComment = async () => {
  const url = '/';
  const data = {
  }
  await client.post(url, data);
};

export const updateComment = async (commentId: number) => {
  const url = `/${commentId}`;
  const data = {
  }
  await client.put(url, data);
};

export const deleteComment = async (commentId: number) => {
  const url = `/${commentId}`;
  await client.delete(url);
};
