import React, { useState } from "react";

import { ColumnDef, Row } from "@tanstack/react-table";

import { FetchHelper } from "@/_utils/FetchHelper";
import { CONFIG } from "@/_utils/Constants";

import { Api } from "@/_constants/Api";

import ReactTableWithPagination from "./ReactTableWithPagination";
import General from "@/_utils/General";

interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const [totalCount, setTotalCount] = useState(0);

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "firstName",
        cell: ({ row }) => {
          console.log("KKDKD", row);

          return `${General.toTitleCase(
            row.original.firstName
          )} ${General.toTitleCase(row.original.lastName)}`;
        },
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: ({ row }) => (
          <span className="fw-bold">{row.original.email || ""}</span>
        ),
      },
      {
        header: "Age",
        accessorKey: "age",
        cell: ({ row }) => (
          <span className="fw-bold">{row.original.age || ""}</span>
        ),
      },
      {
        header: "Gender",
        accessorKey: "gener",
        cell: ({ row }) => (
          <span className="fw-bold">{row.original.gender || ""}</span>
        ),
      },
      // {
      //     header: "Bit Rate",
      //     accessorKey: "bit_rate",
      //     cell: ({ row }) => (
      //         <span className="fw-bold">
      //             {sliceWithEllipsis(row.original.bit_rate, CONFIG.WORD_SLICE_LIMIT)}
      //         </span>
      //     ),
      // },
      // {
      //     header: "ACTION",
      //     accessorKey: "action",
      //     enableSorting: false,
      //     cell: ({ row }) => (
      //         <div className="">
      //             {/* <Link legacyBehavior href="#">
      //                 <a
      //                     role="button"
      //                     className="btn btn-sm btn-primary btn-active-light-primary me-1"
      //                 >
      //                     Edit
      //                 </a>
      //             </Link> */}
      //             <button
      //                 className="btn btn-sm btn-danger btn-active-light-primary"
      //                 onClick={() => {
      //                     handleDelete(row.original.id, row.original.name)
      //                 }}
      //             >
      //                 Delete
      //             </button>
      //         </div>
      //     ),
      // },
    ],
    []
  );

  return (
    <ReactTableWithPagination
      columns={columns}
      endpoint={Api.Users}
      tableHeaderTitle="Users"
      //   showSearchBar={true}
      getFetchResponse={(response) => {
        setTotalCount(response.count || 0);
      }}
      //   dependencies={[refetch]}
      // extraFilters={{
      //   asset_id: assetId,
      //   type: translationType,
      //   category_id: categoryId,
      // }}
      tableClassName={"first-child-fix-width"}
    />
  );
};

export default Users;
