import Main from "@/components/main/main";
import Header from "@/components/header";
import Footer from "@/components/footer";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <Header />
      <Main searchParams={searchParams} />
      <Footer />
    </>
  );
}
