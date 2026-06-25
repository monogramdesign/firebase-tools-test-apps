export async function getServerSideProps() {
  return { props: { now: new Date().toISOString() } };
}
export default function Home({ now }) {
  return <h1>Next SSR OK {now}</h1>;
}
