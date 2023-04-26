import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "./components/Navbar";
import Loading from "./Loading";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
export default function Examen_exobuccal() {
  const [note, setNote] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [message, setMessage] = useState("");
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const patientID = Cookies.get("patientID");
  const user_id = Cookies.get("user_id");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await axios.post(`/api/patient/${patientID}`, {
          searchQuery: patientID,
        });
        setPatient(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchMedicalHistoryData = async () => {
      try {
        const data = await axios.post(`/api/Examen_exobuccal/${patientID}`);
        setMedicalHistory(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    Promise.all([fetchPatientData(), fetchMedicalHistoryData()]).then(() => {
      setLoading(false);
    });
  }, [patientID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note) {
      setMessage("Please fill all fields");
      return;
    }
    const newNote = {
      Note: note,
      DoctorID: user_id,
      PatientID: patientID,
    };
    axios
      .post(`/api/Examen_exobuccal/add`, newNote)
      .then((res) => {
        if (res.status === 200) {
          setMessage("Note added successfully");
          setMedicalHistory([newNote,...medicalHistory]);
          setMessage("Note added successfully");
        } else {
          setMessage("Error adding note");
          return;
        }
      })
      .catch((err) => console.log(err));
    setNote("");
  };

  const handleExamen = () => {
    router.push({
      pathname: "/Examen_Clinique",
      query: { results: JSON.stringify(patientID) },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center h-screen w-screen justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{patient[0].FirstName} | Medical Record</title>
      </Head>
      <header className="flex-none bg-gray-900 border-b border-gray-200">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="py-3 flex justify-between items-center">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/PatientRecord">
                <div className=" font-bold text-lg hover:text-gray-400">
                  Back to Record Page
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="bg-gray-900 text-white min-h-screen px-4 py-8">
      
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            {patient[0].FirstName} {patient[0].LastName}
          </h1>
          <button
            className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-4"
            onClick={handleExamen}
          >
            Examen Clinique
          </button>

          <span className="text-green-500 font-bold">{message}</span>

          <h2 className="text-2xl font-bold mb-4">Doctor's Notes</h2>
          <textarea
            className="bg-gray-700 p-2 mb-4 w-full rounded-md"
            rows="4"
            placeholder="Enter Your Note Here"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="container mx-auto mt-8">
          <div className="bg-gray-800 p-4 rounded-md">
            <h2 className="text-2xl font-bold mb-4">
              Examen exobuccal History
            </h2>

            {medicalHistory.length > 0 ? (
              medicalHistory.map((item) => (
                <div
                  key={item.E_Exam_id}
                  className="border-b border-gray-700 py-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">
                      Diagnosis Date:{" "}
                      {new Date(item.DiagnosisDate).toLocaleDateString()}
                    </h3>
                    <p className="text-gray-500 font-medium">
                      Doctor Name: {item.DoctorFirstName} {item.DoctorLastName}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-gray-500 font-bold mb-2">
                      Examen exobuccal nb : {item.E_Exam_id}
                    </p>
                    <p className="text-gray-300">{item.Note}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="border-b border-gray-700 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">
                    No Examen exobuccal history found!
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
