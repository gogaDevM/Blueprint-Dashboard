import { NextPage } from "next";
import { AppProps } from "next/app";

export type NextPageWithLayout = NextPage;

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

