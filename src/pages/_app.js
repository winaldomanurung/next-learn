import "@/styles/globals.css";
import Head from "next/head";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kodepatra Website</title>
        <meta name="description" content="Ini adalah website Kodepatra" />
      </Head>
      <ul className="navbar">
        <li className="nav-item">
          <Link href="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link href="/sales">Sales</Link>
        </li>
        <li className="nav-item">
          <Link href="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link href="/userprofile">Profile</Link>
        </li>
      </ul>
      <Component {...pageProps} />
    </>
  );
}
