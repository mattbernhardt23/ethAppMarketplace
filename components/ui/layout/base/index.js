import { Navbar, Footer } from "@components/ui/common";
import Head from "next/head";

const ITEMS = [
  {
    href: "/",
    value: "Home",
  },
  {
    href: "/marketplace",
    value: "Marketplace",
  },
  {
    href: "/myContent",
    value: "My Content",
  },
];

export default function BaseLayout({ children }) {
  return (
    <>
      <Head>
        <title>The Power Within</title>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="preconnect"
        />
      </Head>
      <div
      // className="max-w-7xl mx-auto"
      >
        <Navbar items={ITEMS} />
        <div className="fit">{children}</div>
      </div>
      <Footer />
    </>
  );
}
