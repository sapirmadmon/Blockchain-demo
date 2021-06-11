import React, { useState } from "react";
import axios from "axios";
import style from "./AddDeletePage.module.css";

function AddDeletePage() {
  const [description, setDescription] = useState("");
  const [cityName, setCityName] = useState("");
  const [coords, setCoords] = useState("");
  const [file, setFile] = useState(null);
  const [cityNameDelete, setCityNameDelete] = useState("");

  const addData = () => {
    let formData = new FormData();
    formData.append("image", file);
    formData.append("coords", coords);
    formData.append("description", description);
    formData.append("cityName", cityName);
    axios
      .post("http://localhost:3030/addWebsite", formData)
      .then(window.location.reload())
      .catch((err) => console.log(err));
  };

  const deleteData = () => {
    axios
      .delete(`http://localhost:3030/delete/${cityNameDelete}`)
      .then(window.location.reload())
      .catch((err) => console.log(err));
  };

  const onChangeCityName = (e) => {
    setCityName(e.target.value);
  };

  const onChangeCoords = (e) => {
    setCoords(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const changeCityNameDelete = (e) => {
    setCityNameDelete(e.target.value);
  };
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h2 className={style.title}>Add New Website</h2>
      <div>
        <label htmlFor="cityName">City name:</label>
        <input
          type="text"
          id="cityName"
          name="cityName"
          value={cityName}
          onChange={onChangeCityName}
        />
      </div>
      <div>
        <label htmlFor="coords">Coords(string like :"80,200,110,250"):</label>
        <input
          type="text"
          id="coords"
          name="coords"
          value={coords}
          onChange={onChangeCoords}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          id="description"
          name="description"
          width="150px"
          value={description}
          onChange={onChangeDescription}
        ></textarea>
      </div>
      <div>
        <input type="file" id="file" name="file" onChange={onChangeFile} />
      </div>
      <button onClick={addData} className={style.button}>
        Add
      </button>

      <div>
        <label htmlFor="cityName">City name:</label>
        <input
          type="text"
          id="cityName"
          name="cityName"
          value={cityNameDelete}
          onChange={changeCityNameDelete}
        />
      </div>
      <button onClick={deleteData} className={style.button}>
        Delete
      </button>
    </div>
  );
}

export default AddDeletePage;
