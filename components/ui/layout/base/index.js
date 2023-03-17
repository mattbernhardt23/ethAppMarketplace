import { Navbar, Footer } from "@components/ui/common";

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
