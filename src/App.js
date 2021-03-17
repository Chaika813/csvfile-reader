import React, { useState } from 'react';
import FileReader from './FileReader';
import Table from './Table';
import Error from './Error';
import './App.css';

function App() {
  const [tableData, setTableData] = useState([]);
  const [isCSVFileValid, setIsCSVFileValid] = useState(true);

  return (
    <div className="App">
      <div className="container">
      <FileReader setTableData={setTableData} isCSVFileValid={isCSVFileValid} setIsCSVFileValid={setIsCSVFileValid} />
      {isCSVFileValid ? <Table data={tableData} setTableData={setTableData} /> : <Error/>}
      </div>
    </div>
  );
}

export default App;