import React, { useState, useEffect } from 'react';
import net from './network';

const ScreenMessage = ({data}) => {
  if(data===undefined) return null;

  let {message, warning} = data; 
  let messageClass= warning ? "netWarning" : "netMessage" ;

  return (
    <div className={messageClass}>
      {message}
    </div>
  ) 
}

const Search = ({ clbSearch, search }) => {
  return (
    <div>
      Filter phonebook: <input type="text" value={search} onChange={clbSearch} />
    </div>
  )
}

const Numbers = ({ persons, search, deleteClb }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter((elem) => elem.name.indexOf(search) > -1)
        .map((elem, index) => (
          <p key={elem.id}>{elem.name} {elem.phone}
            <button onClick={deleteClb(elem)}>Delete</button>
          </p>))
      }
    </>
)}

const NewName = ({ clbSubmit, name, clbName, phone, clbPhone }) => {
  return (
    <>
      <h2>Add new person</h2>
      <form onSubmit={clbSubmit}>
        <div>
          name: <input value={name} onChange={clbName} />
        </div>
        <div>
          phone: <input value={phone} onChange={clbPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]); //array of cards-persons
  const [newName, setNewName] = useState(''); //value of Name input
  const [newPhone, setNewPhone] = useState(''); //value of phone number input
  const [newSearch, setNewSearch] = useState(''); //value of search input
  const [message, setMessage] = useState(undefined); //value of message component input data

  //callbacks for inputs change  
  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneChange = (event) => setNewPhone(event.target.value);
  const handleSearchChange = (event) => setNewSearch(event.target.value);

  //calback for add new person button
  const addPerson = (event) => {
    event.preventDefault();
    let tmpPerson = persons.find((elem) => elem.name === newName);
  
    if (tmpPerson === undefined) { //case when card is added
      net.newPerson({ name: newName, phone: newPhone })
        .then(response => {
          //setPersons(persons.concat(response)); //works in case of one browser tab  
          getPersons(); //in case of accessing fron multiple tabs we need to reask for the full list
          setNewName('');
          setNewPhone('');
          showMessage(`${response.name} is successfully added to the phonebook!`);
        });
    }
    else if (tmpPerson.phone == newPhone) // persons name and phone matches with the one in the list
      showMessage(`Warning! The card for ${newName} with phone ${newPhone} is already in the phonebook.`,true);
    else {//case when phone number is updated
      if (window.confirm(`${newName} is already in the phonebook.\n 
        Do you want to update the phone: ${tmpPerson.phone} with ${newPhone}?`)) {
        net.updatePerson({ ...tmpPerson, phone: newPhone })
          .then(response => {

            setPersons(persons.map((el) => {
              if (el.id === response.id) return response;
              return el;
            }))
            showMessage(`The phone number for ${response.name} is successfully updated!`);
          })
          .catch(error=>{
            showMessage(`${tmpPerson.name} is already deleted from server!`,true);
            getPersons();
          })
      }
    }
  }
  //callback for delete person buttons
  const deletePerson = (person) => {
    return (e) => {
      if (window.confirm(`Do you really want to delete ${person.name}?`))
        net.deletePerson(person.id)
        .then(response => {
          getPersons();
          showMessage(`${person.name} is successfully deleted from server!`);
        })
        .catch(error=>{
          showMessage(`${person.name} is already deleted from server!`,true);
          getPersons();
        })
    };
  }
  //get persons list from server
  let getPersons = () => { net.getAll().then(response => setPersons(response)) }
  useEffect(getPersons, []);

  //wrapper for showing on and off message component
  let showMessage = (message,warning=false,time=3) =>{
    setMessage({message,warning});
    setTimeout(()=>setMessage(undefined),time*1000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ScreenMessage data={message}/>
      <Search search={newSearch} clbSearch={handleSearchChange} />
      <NewName
        clbSubmit={addPerson}
        name={newName}
        clbName={handleNameChange}
        phone={newPhone}
        clbPhone={handlePhoneChange}
      />
      <Numbers search={newSearch} persons={persons} deleteClb={deletePerson} />
    </div>
  )
}

export default App