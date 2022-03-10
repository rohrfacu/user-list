import { FaUserEdit } from "@react-icons/all-files/fa/FaUserEdit";
import { useState, useEffect } from "react";

const UserCard = (props) => {
  const { id, photo, onChangeUser } = props;

  // The state of our component, keep in mind we obtain the first value
  // of each state from the props, as it can be changed afterwards in
  // edit mode
  const [name, setName] = useState(props.name || "");
  const [email, setEmail] = useState(props.email || "");
  const [number, setNumber] = useState(props.number || "");
  const [location, setLocation] = useState(props.location || "");
  // Edit mode boolean
  const [editMode, setEditMode] = useState(false);
  // First render boolean
  const [firstRender, setFirstRender] = useState(true);

  // Key press handler, called when we press 'Enter'
  // on any input of the component
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEditMode(!editMode);
    }
  };

  // When we change any of the possible fields and we exit edit mode,
  // we call the onChangeUser function to edit the user object
  // directly on the userList, this way, we can filter by the new name
  // if we change it
  useEffect(() => {
    if (!firstRender && !editMode && (name || email || number || location)) {
      onChangeUser(id, {
        name,
        email,
        number,
        location
      });
    }
  }, [name, email, number, location, editMode]);

  // first render bool, to prevent calling onChangeUser when we first
  // load the component
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }
  }, []);

  return (
    <div className="card">
      {/* Header */}
      <div className="header">
        {/* 
          If we click in the edit mode icon, 
          we change the editMode state 
        */}
        <FaUserEdit
          className="user-edit"
          onClick={() => setEditMode(!editMode)}
        />
        {/*
          On each editable field, we conditionally render the field value
          or the input to modify such value according to the editMode state
        */}
        {!editMode && <p>{name}</p>}
        {editMode && (
          <input
            className="edit-mode-input"
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              if (e.target.value) {
                setName(e.target.value);
              }
            }}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        )}
      </div>
      {/* Profile picture */}
      <div className="align-center">
        <img className="photo" src={photo} alt={`${name} profile`} />
      </div>
      {/* Body */}
      <div className="body">
        {!editMode && <p>{email}</p>}
        {editMode && (
          <input
            className="edit-mode-input margin-5px"
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              if (e.target.value) {
                setEmail(e.target.value);
              }
            }}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        )}
        {!editMode && <p>{number}</p>}
        {editMode && (
          <input
            className="edit-mode-input margin-5px"
            type="text"
            name="number"
            value={number}
            onChange={(e) => {
              if (e.target.value) {
                setNumber(e.target.value);
              }
            }}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        )}
        {!editMode && <p>{location}</p>}
        {editMode && (
          <input
            className="edit-mode-input margin-5px"
            type="text"
            name="location"
            value={location}
            onChange={(e) => {
              if (e.target.value) {
                setLocation(e.target.value);
              }
            }}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        )}
      </div>
    </div>
  );
};

export default UserCard;
