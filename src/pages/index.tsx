import PublicHome from "components/tree/Home";
import { getAccessToken } from "utils/storages/local/accessToken";
import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";

export default function Home() {
  const accessToken = getAccessToken();
  const router = useRouter();

  if (accessToken) {
    router.push(ROUTES.MAIN.PATHNAME);
    return null;
  }
  return <PublicHome />;
}

// https://stackoverflow.com/questions/58173809/next-js-redirect-from-to-another-page
// export async function getServerSideProps(context) {
//   const res = await fetch(`https://.../data`);
//   const data = await res.json();
//   // or use context.resolvedUrl for conditional redirect
//   // if(context.resolvedUrl == "/")
//   if (!data) {
//     return {
//       redirect: {
//         destination: "/hello-nextjs",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }