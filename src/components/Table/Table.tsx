import type { Column } from 'react-table';
import { useTable } from 'react-table';
import styled from 'styled-components';

type TableProps<T extends object> = {
  columns: Column<T>[];
  data: readonly T[];
};

export default function Table<T extends object>({
  data,
  columns,
}: TableProps<T>) {
  const tableInstance = useTable({ columns, data: data || [] });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map(
            (
              headerGroup // Apply the header row props
            ) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={`${headerGroup.Header?.toString}-header-key`}
              >
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map(
                    (
                      column // Apply the header cell props
                    ) => (
                      <TableHeader
                        {...column.getHeaderProps()}
                        key={`${column.id}-column-key`}
                      >
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
          rows.map((row) => {
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
                      <TableCell
                        {...cell.getCellProps()}
                        key={`${cell.column.id}-${cell.row.id}-my-unique-cell-key`}
                      >
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
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
  );
}

const TableHeader = styled.th`
  padding: 0 0.4em;
`;

const TableCell = styled.td`
  padding: 0.2em;
  text-align: center;
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
`;
