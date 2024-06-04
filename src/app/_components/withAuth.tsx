"use client";

import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";

import { useEffect } from "react";

export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    let { data: session, status } = useSession();

    useEffect(() => {
      if (status === "loading") return; 

      if (!session) {
        redirect("/login");
      }
    }, [session, status]);

    return <Component {...props} />;
  };
}
