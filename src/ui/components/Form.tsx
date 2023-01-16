import React from 'react';
import styled from 'styled-components';

interface Props {
  createCommentItem: any;
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
}

const Form = ({ createCommentItem, onChange, onSubmit }: Props) => {

  return (
    <FormStyle>
      <form>
        <input
          type='text'
          name='profile_url'
          placeholder='https://picsum.photos/id/1/50/50'
          required
          onChange={onChange}
          value={createCommentItem.profile}
        />
        <br />
        <input
          type='text'
          name='author'
          placeholder='작성자'
          onChange={onChange}
          value={createCommentItem.author}
        />
        <br />
        <textarea
          name='content'
          placeholder='내용'
          required
          onChange={onChange}
          value={createCommentItem.content}
        />
        <br />
        <input
          type='text'
          name='createdAt'
          placeholder='2020-05-30'
          required
          onChange={onChange}
          value={createCommentItem.createdAt}
        />
        <br />
        <button type='submit' onSubmit={onSubmit}>등록</button>
      </form>
    </FormStyle>
  );
};

export default Form;

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }

  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }

  & > form > input[type="text"] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }

  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
