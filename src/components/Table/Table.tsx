import type { Column } from 'react-table';
import { useTable, usePagination } from 'react-table';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import Pagination from './Pagination';
import { honeydew } from '../../utils/colors';

type TableProps<T extends object> = {
  columns: Column<T>[];
  data: readonly T[];
  pagination?: boolean;
  loading?: boolean;
};

export default function Table<T extends object>({ data, columns, pagination = false, loading }: TableProps<T>) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: pagination ? 10 : 100 },
    },
    usePagination
  );

  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map(
              (
                headerGroup // Apply the header row props
              ) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={`${headerGroup.Header?.toString}-header-key`}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map(
                      (
                        column // Apply the header cell props
                      ) => (
                        <TableHeader {...column.getHeaderProps()} key={`${column.id}-column-key`}>
                          {
                            // Render the header
                            column.render('Header')
                          }
                        </TableHeader>
                      )
                    )
                  }
                </tr>
              )
            )
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <TableRow {...row.getRowProps()} key={`${row.id}-row-key`}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <TableCell {...cell.getCellProps()} key={`${cell.column.id}-${cell.row.id}-my-unique-cell-key`}>
                          {loading ? (
                            <Skeleton width="200px" />
                          ) : (
                            // Render the cell contents
                            cell.render('Cell')
                          )}
                        </TableCell>
                      );
                    })
                  }
                </TableRow>
              );
            })
          }
        </tbody>
      </StyledTable>
      {pagination && (
        <Pagination
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          gotoPage={gotoPage}
          nextPage={nextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          previousPage={previousPage}
          setPageSize={setPageSize}
        />
      )}
    </>
  );
}

const TableHeader = styled.th`
  padding: 0.5em 0.4em;
  background-color: ${({ theme }) => theme.secondary + '90'};
  color: ${honeydew};
`;

const TableCell = styled.td`
  padding: 0.2em;
  border-bottom: 2px solid ${({ theme }) => theme.secondary};
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin-bottom: 1em;
`;
