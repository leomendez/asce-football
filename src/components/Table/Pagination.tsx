import React from 'react';
import styled from 'styled-components';
import { Button, Input, Select } from '..';

type Props = {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
  pageIndex: number;
  pageOptions: number[];
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageSize: number;
};

export default function Pagination({
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageCount,
  pageIndex,
  pageOptions,
  canNextPage,
  canPreviousPage,
  pageSize,
}: Props) {

  return (
    <PaginationContainer className="pagination">
      <NavButtons>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>
        <Select
          value={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
            // setPageSize(Number(e.target.value));
          }}
        >
          {pageOptions.map((page) => (
            <option key={page + 1} value={page + 1}>
              {page + 1}
            </option>
          ))}
        </Select>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>
      </NavButtons>
      <PageInfo>
        <Select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </PageInfo>
    </PaginationContainer>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavButtons = styled.div`
  padding: 0.4em;
`;

const PageInfo = styled.div``;
