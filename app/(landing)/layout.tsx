import Footer from "@/app/(landing)/_layout/footer";
import MobileNav from "@/app/(landing)/_layout/mobile-nav";
import HeaderBottom from "./_layout/header/header-bottom";
import HeaderTop from "./_layout/header/header-top";
import FooterBody from "@/app/(landing)/_layout/footer/footer-body";
import Header from "@/app/(landing)/_layout/header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookie = await cookies();
  // const token = cookie.get("access_token")?.value;
  return (
    <div className="min-h-screen flex flex-col">
      {/* <StoreUser token={token} /> */}
      <header className="text-gray-700">
        <Header>
          <HeaderTop />
          <HeaderBottom />
        </Header>
      </header>
      <main className="flex-1 text-gray-900">{children}</main>
      <MobileNav />
      <Footer>
        <FooterBody />
      </Footer>
    </div>
  );
}
