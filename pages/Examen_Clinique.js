import { useState } from "react";
import Navbar from "./components/Navbar";
import ChartingTooth from "./components/ChartingTooth";
import { useRouter } from "next/router";
export default function Home() {
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [msg , setMsg] = useState("");
  const [chartingKey, setChartingKey] = useState(Date.now());
  
  const router = useRouter();
  const patientID  = JSON.parse(router.query.results);
  const handleTeethChange = (event) => {
    const selectedOptions = event.target.selectedOptions;
    const selectedTeeth = [];

    for (let i = 0; i < selectedOptions.length; i++) {
      selectedTeeth.push(selectedOptions[i].value);
    }

    setSelectedTeeth(selectedTeeth);
  };

  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
  };

  const handleSaveCharting = () => {
    if (selectedTeeth.length === 0) {
      setMsg("Please select at least one tooth");
      return;
    }

    if (selectedCondition === "") {
      setMsg("Please select a condition");
      return;
    }

    fetch("/api/tooth_Update_status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teeth: selectedTeeth,
        condition: selectedCondition,
        patientID: patientID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setChartingKey(Date.now());
        if(data.changedRows > 0){
          setMsg("Charting saved successfully");
        }
        else{
          setMsg("Charting not saved");
        }
      })
      .catch((err) => console.log(err));
      

    console.log(selectedCondition, selectedTeeth);
  };

 
  

  return (
    <>
      <Navbar user={JSON.parse(sessionStorage.getItem("user"))} />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
        <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full lg:w-1/3" key={chartingKey}>
            <ChartingTooth />
          </div>
          <div className="w-full lg:w-2/3 flex flex-col items-center justify-start overflow-x-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-10 mb-5">
              Dental Charting App
            </h1>
            <p className="text-red-500 font-bold">{msg}</p>
            <div className="w-full max-w-lg flex flex-col items-center justify-start">
              <label htmlFor="teethSelect" className="block text-gray-700 font-bold mb-2">
                Select teeth:
              </label>
              <select
                className="block appearance-none w-full border-2 border-gray-400 rounded py-2 px-4 mb-5 leading-tight focus:outline-none focus:bg-black-200 focus:border-purple-500"
                id="teethSelect"
                multiple
                onChange={handleTeethChange}
                value={selectedTeeth}
              >
                {[...Array(32).keys()].map((toothNumber) => (
                  <option key={toothNumber} value={toothNumber + 1}>
                    {toothNumber + 1}
                  </option>
                ))}
              </select>
              <label htmlFor="conditionSelect" className="block text-gray-700 font-bold mb-2">
                Select tooth condition:
              </label>
              <select
                className="block appearance-none w-full border-2 border-gray-400 rounded py-2 px-4 mb-5 leading-tight focus:outline-none focus:bg-black-200 focus:border-purple-500"
                id="conditionSelect"
                onChange={handleConditionChange}
                value={selectedCondition}
              >
                <option value="">Select a condition</option>
                <option value="Cavity" >Cavity</option>
                <option value="Missing">Missing</option>
                <option value="Healthy">Healthy</option>

              </select>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSaveCharting}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


