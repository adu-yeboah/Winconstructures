import "../../styles/globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/ui/footer";



type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
