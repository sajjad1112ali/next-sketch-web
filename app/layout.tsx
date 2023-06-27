import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Sketch Haven",
  description:
    "Showcase your creativity and discover remarkable hand made sketched.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={""}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
