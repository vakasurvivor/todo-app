import Main from "@/components/main/main";
import Dialog from "@/components/dialog";
import Header from "@/components/header";
import Footer from "@/components/footert";
import { DialogProvider } from "./dialog-context";

export default function Home() {
  return (
    <DialogProvider>
      <Header />
      <Main />
      <Footer />
      <Dialog />
    </DialogProvider>
  );
}
