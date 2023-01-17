import React from 'react';
import styled from 'styled-components';

interface Props {
  commentsPerPage: number;
  totalComments: number;
  onPaginate: (pageNumber: number) => void;
}

const PageList = ({ commentsPerPage, totalComments, onPaginate }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <PageListStyle>
        {pageNumbers.map((pageNumber) => (
          <Page
            key={pageNumber}
            onClick={() => onPaginate(pageNumber)}
          >
            {pageNumber}
          </Page>
        ))}
      </PageListStyle>
    </>
  );
};

export default PageList;

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Page = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  cursor: pointer;

  ${({ active }: any) =>
          active &&
          `
        background: gray;
        color: #fff;
  `}
  margin-right: 3px;
`;
