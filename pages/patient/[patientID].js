import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import Loading from "../Loading";

export default function PatientPage({ patientID }) {
  const [note, setNote] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [message, setMessage] = useState("");
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [patient, setPatient] = useState([]);

  const fetchMedicalHistory = useCallback(async () => {
    try {
      const res = await axios.post(`/api/medicalhistory/${patientID}`);
      setMedicalHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [patientID]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.post(`/api/patient/${patientID}`, {
          searchQuery: patientID,
        });
        setPatient(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPatient();
    fetchMedicalHistory();
  }, [patientID, fetchMedicalHistory]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!medicalCondition || !note) {
        setMessage("Please fill all fields");
        return;
      }
      const newNote = {
        MedicalCondition: medicalCondition,
        Notes: note,
        DiagnosisDate: new Date().toLocaleDateString(),
        DoctorID: user.cin,
        PatientID: patientID,
      };
      axios
        .post(`/api/medicalhistory/add`, newNote)
        .then((res) => {
          setMedicalHistory((prevState) => [...prevState, res.data]);
          setMessage("Note added successfully");
        })
        .catch((err) => console.log(err));
      setMedicalCondition("");
      setNote("");
    },
    [medicalCondition, note, patientID]
  );

  const handleExamen = useCallback(() => {
    router.push({
      pathname: "/Examen_Clinique",
      query: { results: JSON.stringify(patientID) },
    });
  }, [patientID]);

  if (!patient || !medicalHistory) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Patient: {patientID}</h1>
      <p>Name: {patient.name}</p>
      <p>Age: {patient.age}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="medicalCondition">Medical Condition:</label>
          <input
            type="text"
            id="medicalCondition"
            value={medicalCondition}
            onChange={(e) => setMedicalCondition(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="note">Note:</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Note</button>
        {message && <p>{message}</p>}
      </form>
      <button onClick={handleExamen}>Examen Clinique</button>
      <h2>Medical History:</h2>
      <ul>
        {medicalHistory.map((note) => (
          <li key={note._id}>
            <p>Medical Condition: {note.MedicalCondition}</p>
            <p>Notes: {note.Notes}</p>
            <p>Diagnosis Date: {note.DiagnosisDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { patientID } = context.query;
  return {
    props: {
      patientID,
    },
  };
}
