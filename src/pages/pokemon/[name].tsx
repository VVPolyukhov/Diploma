import { useRouter } from "next/router";
import { wrapper } from "store";
import Head from "next/head";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  getPokemonByName,
  getRunningQueriesThunk,
  useGetPokemonByNameQuery,
} from "store/pokemonApi";
import { useState } from "react";

export default function Pokemon() {
  const router = useRouter();

  const [first, setfirst] = useState(false);

  const name = router.query.name;
  const result = useGetPokemonByNameQuery(
    typeof name === "string" ? name : skipToken,
    {
      // If the page is not yet generated, router.isFallback will be true
      // initially until getStaticProps() finishes running
      skip: router.isFallback,
    }
  );
  const { isLoading, error, data } = result;

  return (
    <>
      <Head>
        <title>{data?.species?.name ?? ""}</title>
      </Head>
      <article>
        <button onClick={() => setfirst((a) => !a)}>lol</button>
        {first ? "yoyoyo" : "heyheyhey"}
        {error ? (
          <>Oh no, there was an error</>
        ) : router.isFallback || isLoading ? (
          <>Loading...</>
        ) : data ? (
          <h3>{data?.item?.name}</h3>
        ) : null}
      </article>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;
    console.log("name", name);
    if (typeof name === "string") {
      store.dispatch(getPokemonByName.initiate(name));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
