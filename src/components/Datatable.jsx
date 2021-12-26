import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import axios from "axios";
// import Table from "./Table";

const Datatable = ({ formData }) => {
  const url = "https://contact-s.herokuapp.com/contactus";
  // const url = "http://localhost:5000/contactus";

  const [user, setUser] = useState([]);

  const fetchdata = async () => {
    const { data } = await axios.get(url);
    setUser(data);
  };
  useEffect(() => {
    fetchdata();
  }, [formData]);

  const datatable = {
    columns: [
      {
        label: "Name",
        field: "name",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Email",
        field: "email",
        width: 270,
      },

      {
        label: "Message",
        field: "text",
        sort: "disabled",

        width: 400,
      },
    ],
    rows: user.map((u) => u),
  };
  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 10, 15]}
      entries={5}
      pagesAmount={4}
      data={datatable}
      searchTop
      searchBottom={false}
    />
  );
};

export default Datatable;
