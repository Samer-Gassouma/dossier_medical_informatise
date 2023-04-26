import Head from 'next/head';

function Landing() {
  return (
    <>
    <Head>
        <title>Computerized Medical Record</title>
        <meta name="description" content="Computerized Medical Record System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <div className="bg-gray-800 min-h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto p-6 rounded-md shadow-lg bg-gray-900">
          <h1 className="text-4xl text-white mb-6">Welcome to the Computerized Medical Record System</h1>
          <p className="text-xl text-white mb-8">
            This system provides a comprehensive and centralized view of patient health data, including medical history,
            diagnoses, test results, treatments, and prescriptions.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md shadow-md" >
              Log in
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md shadow-md">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing