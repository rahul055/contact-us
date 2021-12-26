import { useState } from "react";
import ContactUs from "./components/Contact-us";
import Datatable from "./components/Datatable";
function App() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    text: "",
  });
  return (
    <div>
      <div className="container mx-auto flex flex-col items-center justify-center my-5">
        <div className="flex mb-10">
          <ContactUs formData={formData} setFormData={setFormData} />
        </div>
        <div className="flex mt-5">
          <Datatable formData={formData} />
        </div>
      </div>
    </div>
  );
}

export default App;
