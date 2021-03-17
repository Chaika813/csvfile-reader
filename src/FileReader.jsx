import React, { useState } from 'react';
import Papa from 'papaparse';
import states from './states';


function FileReader(props) {

    const [csvfile, setCSVFile] = useState();


    const handleChange = event => {
        setCSVFile(event.target.files[0])
    };

    const importCSV = () => {
        if (csvfile) {
            if (csvfile.type === "application/vnd.ms-excel") {
                props.setIsCSVFileValid(true)
                Papa.parse(csvfile, {
                    complete: updateData,
                    skipEmptyLines: true,
                    header: true,
                    transform: function (v, k) {
                        phoneNumberFormat(v, k);
                        hasChildrenFormat(v, k);
                        statesFormat(v, k)
                        return v.trim();
                    }
                });
            } else props.setIsCSVFileValid(false)
        } else return alert('Please, upload file')
    };

    const phoneNumberFormat = (v, k) => {
        if (k === 'Phone') {
            v = v.trim();
            const firstFormat = /^\d{10}$/;
            const secondFormat = /^\+1\d{10}$/;
            const thirdFormat = /^1\d{10}$/;
            if (v.match(firstFormat)) {
                return `+1${v}`;
            } else if (v.match(secondFormat)) {
                return v;
            } else if (v.match(thirdFormat)) {
                return `+${v}`;
            }
        }
    }

    const hasChildrenFormat = (v, k) => {
        if (k = 'Has children') {
            v = v.trim();
            if (v === "") {
                return v = 'FALSE'
            }
        }
    }

    const statesFormat = (v, k) => {
        if (k = 'License states') {
            v.trim();
            const keys = Object.keys(states);
            const splitedValue = v.split(/,| /);
            splitedValue.map(v=> {
                if ( keys.includes(v)) {
                   return v = keys.v
                }
            })
        }
    }

    const updateData = (result) => {
        let data = result.data;
        requireHeader(data)
        data = data.map((x, idx) => {
            x['id'] = idx + 1;
            x['Duplicate with'] = null;
            return x;
        })

        props.setTableData(data);
        console.log(`Finished: `, data);
    }

    const requireHeader = (data) => {
        debugger
        let keys = Object.keys(data);
        let lowerCaseKey = keys.map(k => {
            k.toLowerCase();
        })
        if (!lowerCaseKey.includes('full name') || !lowerCaseKey.includes('phone') || !lowerCaseKey.includes('email')) {
            props.setIsCSVFileValid(false);
        }
    }


    return (
        <div className="container">
            <h2>Import CSV File!</h2>
            <input
                className="csv-input"
                type="file"
                name="csvfile"
                // accept=".csv"
                onChange={handleChange}
            />
            <p />
            <button onClick={importCSV}> Upload now!</button>
        </div>
    );
}


export default FileReader;