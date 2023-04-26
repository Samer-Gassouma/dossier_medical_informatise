import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function AddPatient() {
  const [patientCardNb, setPatientCardNb] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sickness, setSickness] = useState([]);
  const [DoctorID, setDoctorID] = useState(null);
  const [otherSickness, setOtherSickness] = useState("");
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setDoctorID(user.cin);
    }
  }, []);


  const handleSubmit = (e) => {
    if (otherSickness.length > 0) {
      sickness.push(otherSickness);
    }
    setSickness(sickness.filter(item => item !== 'other'));

    console.log(sickness);
    e.preventDefault();

    const isNumeric = /^\d+$/;
    const isDate = /^\d{4}-\d{2}-\d{2}$/;

    if (!patientCardNb.match(isNumeric)) {
      setMessage("Patient Card Number should contain only numeric values");
      return;
    }

    if (!phone.match(isNumeric)) {
      setMessage("Phone number should contain only numeric values");
      return;
    }

    if (!dateOfBirth.match(isDate)) {
      setMessage("Date of birth should be in the format yyyy-mm-dd");
      return;
    }

    if (!firstName || !lastName || !gender || !address) {
      setMessage("Please fill all required fields");
      return;
    }

    axios
      .post("/api/Add_patients", {
        patientCardNb,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        address,
        phone,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Patient Added Successfully");
          axios.post("/api/Log", {
            action: "Add Patient",
            patientID: patientCardNb,
          });
          axios
            .post("/api/Log_teeth", {
              patientCardNb,
              DoctorID,
            })
            .then((res) => {
              if (res.status === 200) {
                console.log("Teeth Log Added Successfully");
              }
            });

          if (sickness.length > 0) {
            axios
              .post("/api/Log_sickness", {
                patientCardNb,
                sickness,
              })
              .then((res) => {
                if (res.status === 200) {
                  console.log("Sickness Log Added Successfully");
                }
              });
          }
          setMessage("Patient Added Successfully");
        } else {
          setMessage("Patient Card Number Already Exist");
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Internal Server Error");
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Head>
        <title>Add Patient</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex-none bg-gray-900 border-b border-gray-200">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="py-3 flex justify-between items-center">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <div className=" font-bold text-lg hover:text-gray-400">
                  Back to Main Page
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-bold  text-center mb-10">
              Add Patient
            </h1>
            {message && (
              <div className="bg-red-50 border border-red-500 text-red-500 px-4 py-2 mb-6 rounded">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="patientCardNb"
                  className="block text-sm font-medium text-white"
                >
                  Patient Card Number:
                </label>
                <div className="mt-1">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 bg-gray-700"
                    id="patientCardNb"
                    type="text"
                    placeholder="Enter Patient Card Number"
                    value={patientCardNb}
                    onChange={(e) => setPatientCardNb(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-white"
                >
                  First Name:
                </label>
                <div className="mt-1">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 bg-gray-700"
                    id="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-white"
                >
                  Last Name:
                </label>
                <div className="mt-1">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 bg-gray-700"
                    id="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-white"
                >
                  Date of Birth:
                </label>
                <div className="mt-1">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 bg-gray-700"
                    id="dateOfBirth"
                    type="date"
                    placeholder="Enter Date of Birth (YYYY-MM-DD)"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-white"
                >
                  Gender:
                </label>
                <div className="mt-1">
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 bg-gray-700"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-white"
                >
                  Address:
                </label>
                <div className="mt-1">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 bg-gray-700"
                    id="address"
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-white"
                >
                  Phone:
                </label>
                <div className="mt-1">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 bg-gray-700"
                    id="phone"
                    type="text"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-gray-800 rounded-md shadow-lg p-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Sickness:
                </label>
                <div className="mt-1">
                  <fieldset className="border border-gray-700 rounded-md p-2">
                    <legend className="text-white text-sm font-medium mb-2">
                      Select all that apply:
                    </legend>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="cancer"
                          name="sickness"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          value="cancer"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSickness([...sickness, e.target.value]);
                            } else {
                              setSickness(
                                sickness.filter(
                                  (item) => item !== e.target.value
                                )
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor="cancer"
                          className="ml-2 block text-sm text-white"
                        >
                          Cancer
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="diabetes"
                          name="sickness"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          value="diabetes"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSickness([...sickness, e.target.value]);
                            } else {
                              setSickness(
                                sickness.filter(
                                  (item) => item !== e.target.value
                                )
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor="diabetes"
                          className="ml-2 block text-sm text-white"
                        >
                          Diabetes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="heart"
                          name="sickness"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          value="heart"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSickness([...sickness, e.target.value]);
                            } else {
                              setSickness(
                                sickness.filter(
                                  (item) => item !== e.target.value
                                )
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor="heart"
                          className="ml-2 block text-sm text-white"
                        >
                          Heart
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="asthma"
                          name="sickness"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          value="asthma"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSickness([...sickness, e.target.value]);
                            } else {
                              setSickness(
                                sickness.filter(
                                  (item) => item !== e.target.value
                                )
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor="asthma"
                          className="ml-2 block text-sm text-white"
                        >
                          Asthma
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="other"
                          name="sickness"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          value="other"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSickness([...sickness, e.target.value]);
                            } else {
                              setSickness(
                                sickness.filter(
                                  (item) => item !== e.target.value
                                )
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor="other"
                          className="ml-2 block text-sm text-white"
                        >
                          Other
                        </label>
                      </div>
                      {sickness.includes("other") && (

                        
                        
                        <div className="mt-2">
                          <label
                            htmlFor="other-input"
                            className="block text-sm font-medium text-white mb-1"
                          >
                            Other Sickness:
                          </label>
                          <input
                            id="other-input"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 bg-gray-700"
                            placeholder="Enter Sickness"
                            value={otherSickness}
                            onChange={(e) => setOtherSickness(e.target.value)}
                            onBlur={(e) => {
                              const sicknessArr = e.target.value
                                .split(",")
                                .map((s) => s.trim());
                              setSickness((prevSickness) => [
                                ...prevSickness,
                                ...sicknessArr,
                              ]);
                              
                              setOtherSickness("");
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </fieldset>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
