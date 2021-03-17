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
                        v = v.trim();
                        v = phoneNumberFormat(v, k);
                        v = hasChildrenFormat(v, k);
                        v = statesFormat(v, k);
                        return v;
                    }
                });
            } else props.setIsCSVFileValid(false)
        } else return alert('Please, upload file')
    };

    const phoneNumberFormat = (v, k) => {
        if (k === 'Phone') {
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
        return v;
    }

    const hasChildrenFormat = (v, k) => {
        if (k === 'Has children') {
            if (v === "") {
                return v = 'FALSE'
            }
        }
        return v;
    }

    const statesFormat = (v, k) => {
        if (k === 'License states') {
            const keys = Object.keys(states);
            const splitedValue = v.split(/, |,/);
            return splitedValue.map(v => {
                let vLow = v.toLowerCase();
                if (keys.includes(vLow)) {
                    let abb = states[vLow];
                    return v = abb;
                } else return v.toUpperCase();
            }).join('|');
        }
        return v;
    }

    const updateData = (result) => {
        let data = result.data;
        requiredHeader(data);
        if (props.isCSVFileValid) {
            data = data.map((x, idx) => {
                x['id'] = idx + 1;
                x['Duplicate with'] = null;
                return x;
            })
            checkForDuplicates(data);
            props.setTableData(data);
            console.log(`Finished: `, data);
        }
    }

    const checkForDuplicates = (data) => {
        
        data.map(row => {
            const email = row['Email'].toLowerCase()
            const phone = row['Phone'].toLowerCase()
            const duplicate = data.find(f => (f['Email'].toLowerCase() === email
                || f['Phone'].toLowerCase() === phone) && f.id !== row.id)

            if (duplicate) {
                row['Duplicate with'] = duplicate.id
            }
        })
    }

    const requiredHeader = (data) => {
         
        let keys = Object.keys(data[0]);
        let lowerCaseKey = keys.map(k => k.toLowerCase())
        if (!lowerCaseKey.includes('full name') || !lowerCaseKey.includes('phone') || !lowerCaseKey.includes('email')) {
           props.setIsCSVFileValid(false);
           return false;
        }
    }


    return (
        <div className="container">
            <h2>Import Users</h2>
            <input
                className="csv-input"
                type="file"
                name="csvfile"
                onChange={handleChange}
            />
            <p />
            <button className='btn btn-primary' onClick={importCSV}> Upload now</button>
        </div>
    );
}


export default FileReader;