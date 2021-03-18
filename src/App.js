import React, { useState } from 'react';
import FileReader from './app/FileReader';
import Table from './app/Table';
import Error from './app/Error';
import './App.css';

function App() {
  const [tableData, setTableData] = useState([]);
  const [isCSVFileValid, setIsCSVFileValid] = useState(true);

  return (
    <div className="App">
      <FileReader setTableData={setTableData} isCSVFileValid={isCSVFileValid} setIsCSVFileValid={setIsCSVFileValid} />
      {isCSVFileValid ? <Table data={tableData} setTableData={setTableData} /> : <Error/>}
    </div>
  );
}

export default App;