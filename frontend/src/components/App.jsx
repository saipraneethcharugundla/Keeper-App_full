import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

import axios from 'axios';

function App() {

  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
axios.get("http://localhost:4000/getUsers")
  .then(res => {
    setAllNotes(res.data);
  })
}, []);

  function handleDeleteItem()
  {
    axios.get("http://localhost:4000/getUsers")
      .then(res => {
        setAllNotes(res.data);
      });
  }
  function addItem(newNote) {


    axios.post("http://localhost:4000/createUser", newNote)
      .then(res => setAllNotes(prevNotes => {
        return [...prevNotes, res.data];
      }));

    // setAllNotes((prevNotes) => {
    //   return [...prevNotes, newNote];
    // });
  }

  function deleteNote(item) {
       console.log(item);
    axios.post(`http://localhost:4000/delete/`,item)
    .then(() => {
    handleDeleteItem();
  });


    // setAllNotes((prevNotes) => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== id;
    //   });
    // });
  }

  return (

    <div>
      <Header />
      <CreateArea onAdd={addItem} />
      {allNotes.map((noteitem, index) => {
        return (
          <Note
            key={index}
            id={index}
            obj={noteitem}
            title={noteitem.title}
            content={noteitem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
