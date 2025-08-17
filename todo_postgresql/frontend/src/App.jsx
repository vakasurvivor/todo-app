import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Dialog from "./components/Dialog";
import { DialogContext } from "./DialogContext";
import { useRef } from "react";

function App() {
  const dialogRef = useRef(null);
  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();
  return (
    <DialogContext
      value={{
        openDialog,
        closeDialog,
      }}
    >
      <Header />
      <Main />
      <Footer />
      <Dialog ref={dialogRef} />
    </DialogContext>
  );
}

export default App;
