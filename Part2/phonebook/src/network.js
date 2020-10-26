import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

let newPerson = (person) => {
    return axios
        .post(baseUrl, person)
        .then(response => response.data)
        .catch(error => console.log("Network error: ", error));
}

let updatePerson = (person) => {
    return axios
        .put(`${baseUrl}/${person.id}`, person)
        .then(response => response.data)
//        .catch(error => console.log("Network error: ", error));
}

let deletePerson = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
//        .catch(error => console.log("Network error: ", error));
}

let getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data);
    //        .catch(error => console.log("Network error: ", error));
}

export default {
    newPerson,
    getAll,
    deletePerson,
    updatePerson
}