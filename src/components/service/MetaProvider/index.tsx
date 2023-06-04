import { ROUTES_INFO_BY_PATHNAME } from "constants/shared/routes";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";

interface IProps {}
const MetaProvider: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {ROUTES_INFO_BY_PATHNAME[router.pathname]?.TITLE ||
            `Образовательная платформа "In Course"`}
        </title>
        <meta name="description" content="Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default MetaProvider;
