import Head from 'next/head'

function Main() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Head>
        <title>Computerized Medical Record</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        
        
        <h1 className="text-4xl font-bold text-white mb-4">
          Computerized Medical Record
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Keep track of your patients' medical history
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/Add_Pation"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200"
          >
            Register Patient
          </a>
          <a
            href="/Pation_Req"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200"
          >
            Search Records
          </a>

        </div>
        
      </div>
      
    </div>
  )
}

export default Main