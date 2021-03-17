import moment from "moment";
import { Children } from "react";

function getValidator(type) {


    switch (type) {
        case 'Age':
            return ageValidator;
        case 'Experience':
            return experienceValidator;
        case 'Yearly Income':
            return yearlyIncomeValidator;
        case 'Expiration date':
            return dateValidator;
        case 'Phone':
            return phoneValidator;
        case 'Has children':
            return childrenValidator;
        case 'License number':
            return licenseValidator;
        case 'License states':
            return licenseStatesValidator;
    }
}

function ageValidator(data) {
    const ageNumber = parseFloat(data['Age']);
    return ageNumber >= 21 && ageNumber <= 110 && Number.isInteger(ageNumber);
}

function experienceValidator(data) {
    const expNumber = parseFloat(data['Experience']);
    const ageNumber = parseFloat(data['Age']);
    return expNumber >= 0 && expNumber < ageNumber
}

function yearlyIncomeValidator(data) {
    const income = data['Yearly Income'];
    const incomeNumber = parseFloat(income);
    const s = income.split('.');
    if (Number.isInteger(incomeNumber) && incomeNumber < 1000000 && incomeNumber >= 0) {
        return true
    } else if (s[1]) {
        if ((s[1].length > 2)) {
            return false
        }
    } else return false

    return true
}

function dateValidator(data) {
    const today = new Date();
    const firstFormat = moment(data['Expiration date'], 'YYYY-MM-DD', true);
    const secondFormat = moment(data['Expiration date'], 'MM/DD/YYYY', true);
    if (today > data['Expiration date']) {
        return false;
    }
    return firstFormat.isValid() || secondFormat.isValid();

}

function phoneValidator(data) {
    const phoneNumber = data['Phone'];

    return phoneNumber.startsWith('+1') && phoneNumber.length === 12
}

function childrenValidator(data) {
    const children = data['Has children'].toLowerCase();
    if (children === 'true' || children === 'false' || children === "") {
        return true;
    } else return false;
}

function licenseValidator(data) {
    return data['License number'].length == 6;
}

function licenseStatesValidator(data) {
    return data['License states'].match(/[A-Z]{2}\||[A-Z]{2}/);
}
export default getValidator;