import React, { useEffect } from 'react';
import './Table.css';
import getValidator from './tableValidator';

function Table(props) {

    const getKeys = () => {
        if (props.data !== []) {
            return Object.keys(props.data[0])
        } return null;
    }

    useEffect(() => {
        validateData();
        checkForDuplicates();
    }, [props.data])

    const validateData = () => {
        props.data.map((row, index) => {
            const keys = getKeys();
            keys.map((key) => {
                const validator = getValidator(key);
                if (validator) {
                    if (!validator(row)) {
                        document.getElementById(key + '-' + index).classList.add("failed-cell");
                    }
                }
            })
        })
    }

    const checkForDuplicates = () => {
       props.data.map(row => {
            const email = row['Email'].toLowerCase()
            const phone = row['Phone'].toLowerCase()
            const duplicate = props.data.find(f => (f['Email'].toLowerCase() === email
                || f['Phone'].toLowerCase() === phone) && f.id !== row.id)
                
            if (duplicate) {
                row['Duplicate with'] = duplicate.id
            }
        })
        props.setTableData(props.data);
    }

    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Age</th>
                        <th scope="col">Experience</th>
                        <th scope="col">Yearly Income</th>
                        <th scope="col">Has children</th>
                        <th scope="col">License states</th>
                        <th scope="col">Expiration date</th>
                        <th scope="col">License number</th>
                        <th scope="col">Duplicate with</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((row, index) => {
                        return <tr key={index}>
                            <th scope="row">{row.id}</th>
                            <RenderRow idx={index} data={row} keys={getKeys().filter(x => x !== 'id')} /></tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

const RenderRow = (props) => {
    
    return props.keys.map((key) => {
        return <td key={key + '-' + props.idx} id={key + '-' + props.idx}>{props.data[key]}</td>
    })
}


export default Table;

