import { BiFirstPage, BiLastPage } from 'react-icons/bi';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import styled from 'styled-components';
import { Select } from '..';
import Button from '../Button/Button'

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
        <NavButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <BiFirstPage />
        </NavButton>
        <NavButton onClick={() => previousPage()} disabled={!canPreviousPage}>
          <MdNavigateBefore />
        </NavButton>
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
        <NavButton onClick={() => nextPage()} disabled={!canNextPage}>
          <MdNavigateNext />
        </NavButton>
        <NavButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <BiLastPage />
        </NavButton>
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
  display: flex;
  gap: 2px;
`;

const NavButton = styled(Button)`
  font-size: 1.2em;
  padding: 0 0.3em;
`

const PageInfo = styled.div``;
