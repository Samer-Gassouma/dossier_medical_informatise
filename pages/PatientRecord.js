import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "./components/Navbar";
import Loading from "./Loading";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Examen_endobuccal() {
  const [note, setNote] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [message, setMessage] = useState("");
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [patientSickness, setPatientSickness] = useState([]);
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
        const data = await axios.post(`/api/medicalhistory/${patientID}`);
        setMedicalHistory(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPatientSicknessData = async () => {
      try {
        const data = await axios.post(`/api/patientsickness/${patientID}`);
        setPatientSickness(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    Promise.all([
      fetchPatientData(),
      fetchMedicalHistoryData(),
      fetchPatientSicknessData(),
    ]).then(() => {
      setLoading(false);
    });
  }, [patientID]);

  const handleExamen = () => {
    router.push({
      pathname: "/Examen_Clinique",
      query: { results: JSON.stringify(patientID) },
    });
  };

  const handleExamenEndobuccal = () => {
    router.push({
      pathname: "/Examen_endobuccal",
      query: { results: JSON.stringify(patientID) },
    });
  };

  const handleExamenExobuccal = () => {
    router.push({
      pathname: "/Examen_exobuccal",
      query: { results: JSON.stringify(patientID) },
    });
  };

  const handleExamenfonctionnel = () => {
    router.push({
      pathname: "/Examen_Clinique",
      query: { results: JSON.stringify(patientID) },
    });
  };

  const handleExamenPalatal = () => {
    router.push({
      pathname: "/Examen_Parodontal",
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
      <Navbar user={user_id} />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-800 p-4 rounded-md">
              <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
              <ul className="space-y-4">
                <li>
                  <span className="font-bold">Date of Birth:</span>{" "}
                  {new Date(patient[0].DateOfBirth).toLocaleDateString()}
                </li>
                <li>
                  <span className="font-bold">Gender:</span> {patient[0].Gender}
                </li>
                <li>
                  <span className="font-bold">Address:</span>{" "}
                  {patient[0].Address}
                </li>
                <li>
                  <span className="font-bold">Phone:</span>{" "}
                  {patient[0].PhoneNumber}
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <h2 className="text-2xl font-bold mb-4">Medical Information</h2>
              <ul className="space-y-4">
                <li>
                  <span className="font-bold">sickness :</span>
                  {patientSickness && patientSickness.length === 0 && (
                    <span> No sickness</span>
                  )}
                  {patientSickness.map((s) => (
                    <span key={s.p_sickness_id}>
                      <br></br>
                      {s.sickness}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-white mb-4">
            Computerized Medical Record
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Keep track of your patients' medical history
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleExamenExobuccal}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              Examen exo-buccal
            </button>
            <button
              href="/Examen_endobuccal"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200"
              onClick={handleExamenEndobuccal}
            >
              Examen endo-buccal
            </button>
            <button
              onClick={handleExamenfonctionnel}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              Examen fonctionnel
            </button>
            <button
              onClick={handleExamenPalatal}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200"
            >
              Examen Parodontal
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
