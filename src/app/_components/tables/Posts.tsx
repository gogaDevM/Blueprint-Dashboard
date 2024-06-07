"use client";

import React, { useEffect, useState } from "react";

import moment, { Moment } from "moment";

import { Column } from "react-table";

import BaseTable from "@tables/BaseTable";

// import Edit from "@tables/cells/Edit";

import General from "@/_utils/General";

import { Api } from "@/_constants/Api";

interface UsersProps {}

interface Row {
  [key: string]: any;
}

const Posts: React.FC<UsersProps> = () => {
  const [selectedPost, setSelectedPost] = useState<any>();
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const columns: Column<Row>[] = [
    // {
    //   Header: "TITLE",
    //   id: "title",
    //   accessor: (post) => moment(post.title).format("DD MMM YYYY"),
    // },
    // {
    //   Header: "BODY",
    //   id: "body",
    //   Cell: ({ row }: { row: any }) => {
    //     const admin = row.original;
    //     return `${General.toTitleCase(
    //       admin.user.first_name
    //     )} ${General.toTitleCase(admin.user.last_name)}`;
    //   },
    // },
    // {
    //   Header: "EMAIL",
    //   id: "user.email",
    //   accessor: (admin) => admin.user.email || "-",
    // },
    // {
    //   Header: "",
    //   id: "slug",
    //   Cell: ({ row }: { row: any }) => {
    //     let admin = row.original;

    //     return (
    //       <div className={" text-end my-auto"} style={{ display: "flex" }}>
    //         {/* <Edit
    //           onEditClicked={() => {
    //             setShowAdminModal(true);
    //             setSelectedUser({
    //               ...admin,
    //             });
    //           }}
    //         /> */}
    //       </div>
    //     );
    //   },
    // },
  ];

//   const renderToolbar = () => {
//     return (
//       <div
//         className="card-toolbar"
//         data-bs-toggle="tooltip"
//         data-bs-placement="top"
//         data-bs-trigger="hover"
//         data-kt-initialized={1}
//         data-bs-original-title=""
//         title=""
//       >
//         <a
//           href="javascript:;"
//           className="btn btn-primary"
//           onClick={() => setShowAdminModal(true)}
//         >
//           <span className="svg-icon svg-icon-3">
//             <svg
//               width={24}
//               height={24}
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect
//                 opacity="0.5"
//                 x="11.364"
//                 y="20.364"
//                 width={16}
//                 height={2}
//                 rx={1}
//                 transform="rotate(-90 11.364 20.364)"
//                 fill="currentColor"
//               />
//               <rect
//                 x="4.36396"
//                 y="11.364"
//                 width={16}
//                 height={2}
//                 rx={1}
//                 fill="currentColor"
//               />
//             </svg>
//           </span>
//           Add Admin
//         </a>
//       </div>
//     );
//   };

  return (
    <div className="card my-5 mb-xl-8">
      <BaseTable
     columns={columns}
     endpoint={Api.Posts}
     title="Posts"
     noDataMessage="No Posts Found"
     showSearch={false}
     showFilter={false}
     dateRange={false}
    //  renderToolbar={renderToolbar}
     refresh={refresh}
      />
      {/* {showAdminModal && (
        <Admin
          show={showAdminModal}
          selectedUser={selectedUser}
          onHide={() => {
            setShowAdminModal(false);
            setSelectedUser(null);
          }}
          onSuccess={() => {
            setRefresh(!refresh);
            setShowAdminModal(false);
            setSelectedUser(null);
          }}
        />
      )} */}
    </div>
  );
};

export default Posts;
