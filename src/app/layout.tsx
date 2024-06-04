import AuthProvider from "./_providers/AuthProvider";

import Styles from "@components/Styles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Blueprint Dashboard</title>
        <meta
          name="description"
          content="Blueprint is a project template."
        />
        <meta
          name="keywords"
          content="admin, dashboard, template."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <Styles />
      </head>
      <body className="header-fixed header-tablet-and-mobile-fixed aside-enabled aside-fixed">
        <AuthProvider>
          {children}
          {/* <ReactQueryProvider>{children}</ReactQueryProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
