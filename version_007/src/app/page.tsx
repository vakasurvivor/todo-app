import Main from "@/components/Main";
import Dialog from "@/components/Dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DialogProvider } from "./DialogContext";

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
