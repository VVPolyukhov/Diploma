import PublicHome from "components/tree/Home";

export default function Home() {
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