import { Checkbox, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { RowBtnGroup } from "./row-btn-group";
import { URLS } from "@/constants";

export type DynamicTableProps = {
  data: Record<string, any>[];
  headColumns: Array<{ key: string; name: string }>;
  toggleSelectRow: (id: number) => void;
  handleDeleteRow: (id: number) => void;
};

export function DynamicTable({
  data,
  headColumns,
  toggleSelectRow,
  handleDeleteRow
}: DynamicTableProps) {
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>{""}</Th>
            {headColumns.map((col, i) => (
              <React.Fragment key={i + 1}>
                <Th>{col.name}</Th>
              </React.Fragment>
            ))}
            {/* <Th>ID</Th>
            <Th>Title</Th> */}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <Tr>
                <Td>
                  <Checkbox isChecked={item.checked} onChange={() => toggleSelectRow(item.id)} />
                </Td>
                {headColumns.map((col, i) => (
                  <React.Fragment key={i + 1}>
                    <Td>{item[col.key]}</Td>
                  </React.Fragment>
                ))}
                {/* <Td>{item.id}</Td>
                <Td>{item.title}</Td> */}
                <Td>
                  <RowBtnGroup
                    links={{
                      view: URLS.PERMISSION_VIEW(item.id),
                      edit: URLS.PERMISSION_EDIT(item.id)
                    }}
                    onDelete={() => handleDeleteRow(item.id)}
                  />
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
