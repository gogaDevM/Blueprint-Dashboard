"use client";

import dynamic from "next/dynamic";

import React, { useState } from "react";

import { NextPageWithLayout } from "@/_types/page";

const Posts = dynamic(() => import("@components/tables/Posts"), {
  ssr: false,
});

const PostsPage: NextPageWithLayout = () => {
  return <Posts />;
};

export default PostsPage;
