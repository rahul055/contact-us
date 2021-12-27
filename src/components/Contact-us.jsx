import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = ({ formData, setFormData }) => {
  const url = "https://contact-s.herokuapp.com/contactus";
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};
    const alphabetvalidation = /^[a-zA-Z]*$/;
    const emailvalidation =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!values.firstname) {
      errors.firstname = "Firstname required.";
    } else if (!alphabetvalidation.test(values.firstname)) {
      errors.firstname = "Numbers are not allowed.";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname required.";
    } else if (!alphabetvalidation.test(values.lastname)) {
      errors.lastname = "Numbers are not allowed.";
    }
    if (!values.email) {
      errors.email = "Email required.";
    } else if (!emailvalidation.test(values.email)) {
      errors.email =
        "Email should be in valid format (e.g. someone@example.com).";
    }
    if (!values.text) {
      errors.message = "Message required.";
    }
    return errors;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (formErrors) {
      setIsSubmit(true);
      setFormErrors(validate(formData));
    }
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
      setIsSubmit(false);
      const submithandle = async () => {
        try {
          const res = await axios.post(url, formData);
          toast.success("Feedback added!", { duration: 4000 });
          setFormErrors({});
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            text: "",
          });
        } catch (error) {
          console.log(error);
        }
      };
      submithandle();
    }
  }, [formErrors]);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className=" text-center flex items-center justify-center text-3xl mb-5 font-bold border-b border-blue-500 text-gray-500">
        Contact us
      </div>

      <form onSubmit={submitHandler} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input
              className={
                formErrors.firstname
                  ? "rounded py-3 px-4 mb-3 leading-tight border-2 border-red-400 appearance-none block w-full bg-gray-200 text-gray-700  focus:outline-none focus:bg-white"
                  : "border border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              }
              type="text"
              onChange={(e) => {
                setFormData({ ...formData, firstname: e.target.value });
              }}
              value={formData.firstname}
            />
            <p className="text-red-500 text-xs  ">{formErrors.firstname}</p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
            <input
              className={
                formErrors.lastname
                  ? "rounded py-3 px-4 mb-3 leading-tight border-2 border-red-400 appearance-none block w-full bg-gray-200 text-gray-700  focus:outline-none focus:bg-white"
                  : " border border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              }
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              value={formData.lastname}
            />
            <p className="text-red-500 text-xs  ">{formErrors.lastname}</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              E-mail
            </label>
            <input
              className={
                formErrors.email
                  ? "border-2 border-red-400 appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  : "border border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              }
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
            <p className="text-red-500 text-xs  ">{formErrors.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Message{" "}
            </label>
            <textarea
              className={
                formErrors.message
                  ? "border-2 border-red-400 no-resize appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight h-48 resize-none focus:outline-none focus:bg-white focus:border-gray-500"
                  : " no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              }
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              value={formData.text}
            />
            <p className="text-red-500 text-xs  ">{formErrors.message}</p>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <button
              className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Send
            </button>
          </div>
          <div className="md:w-2/3"></div>
        </div>
      </form>

      <div className="border-b mt-5"></div>
    </div>
  );
};

export default ContactUs;
