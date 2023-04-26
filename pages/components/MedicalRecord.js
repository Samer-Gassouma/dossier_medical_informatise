import Head from 'next/head';

const Main = () => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Computerized Medical Record</title>
        <meta name="description" content="Computerized Medical Record" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:justify-between sm:items-center border-b-2 border-gray-300 py-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Computerized Medical Record</h1>
          <div className="mt-4 sm:mt-0">
            <button className="bg-white text-gray-800 rounded-md py-2 px-4 mr-4 hover:bg-gray-200">
              Sign in
            </button>
            <button className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700">
              Sign up
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-2">
              <h2 className="text-xl font-bold text-gray-800">Patient Information</h2>
              <p className="text-gray-600 mt-2">
                View and manage patient information, including medical history, allergies,
                medications, and more.
              </p>
            </div>
            <div className="px-4 py-2">
              <button className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700">
                View Patients
              </button>
            </div>
          </div>

          <div className="md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-2">
              <h2 className="text-xl font-bold text-gray-800">Appointments</h2>
              <p className="text-gray-600 mt-2">
                Schedule, modify, and view upcoming appointments with patients.
              </p>
            </div>
            <div className="px-4 py-2">
              <button className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700">
                View Appointments
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-2">
              <h2 className="text-xl font-bold text-gray-800">Prescriptions</h2>
              <p className="text-gray-600 mt-2">
                Manage patient prescriptions, including writing new prescriptions and refilling
                existing ones.
              </p>
            </div>
            <div className="px-4 py-2">
              <button className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700">
                View
                </button>
            </div>

            </div>
           <div className="md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-2">
                <h2 className="text-xl font-bold text-gray-800">Medical History</h2>
                <p className="text-gray-600 mt-2">
                View and manage patient medical history, including past appointments, prescriptions, and more.
                    </p>
            </div>
            <div className="px-4 py-2">
                <button className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700">
                    View
                    </button>
            </div>
        </div>
        </div>
        </main>
        <footer className="bg-gray-100 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-400 text-sm">
                    &copy; 2023 DMI. All rights reserved.
                </p>
                </div>
            </footer>

        </div>
  );
};

export default Main;
