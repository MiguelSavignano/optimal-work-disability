import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const API_URL = process.env.NODE_ENV == "production" ? "https://optimal-work-disability.herokuapp.com" : "http://localhost:5000";

class App extends Component {
  async componentDidMount() {
    const allDiseases = await fetch(`${API_URL}/all-diseases`).then(r =>
      r.json()
    );
    this.setState({ allDiseases });
    const allAgeRage = await fetch(`${API_URL}/all-age-rage`).then(r =>
      r.json()
    );
    this.setState({ allAgeRage });
    const allGenderRage = await fetch(`${API_URL}/all-gender-rage`).then(r =>
      r.json()
    );
    this.setState({ allGenderRage });
    const allOcupation = await fetch(`${API_URL}/all-ocupation`).then(r =>
      r.json()
    );
    this.setState({ allOcupation });
  }

  state = {
    allDiseases: [],
    allAgeRage: [],
    allGenderRage: [],
    allOcupation: [],
    form: {},
    result: ""
  };

  setValue = name => event => {
    this.setState({ form: { ...this.state.form, [name]: event.target.value } });
  };

  onSubmit = event => {
    var self = this;
    var data = JSON.stringify(this.state.form);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        self.setState({ result: JSON.parse(this.responseText).result });
      }
    });

    xhr.open("POST", "http://localhost:5000/optimal-time");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">Calculo de baja</p>
        <label htmlFor="">Enfermedad:</label>
        <select onChange={this.setValue("code")}>
          <option value={""}> </option>
          {this.state.allDiseases.map((disease, index) => (
            <option key={disease["CODIGO"]} value={disease["CODIGO"]}>
              {disease["DESCRIPCION"]}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="">Edad:</label>
        <select onChange={this.setValue("age_rage")}>
          <option value={""}> </option>
          {this.state.allAgeRage.map((item, index) => (
            <option key={item["name"]} value={item["name"]}>
              {item["name"]}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="">Genero:</label>
        <select onChange={this.setValue("gender")}>
          <option value={""}> </option>
          {this.state.allGenderRage.map((item, index) => (
            <option key={item["name"]} value={item["name"]}>
              {item["name"]}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="">Ocupació:</label>
        <select onChange={this.setValue("ocupation_code")}>
          <option value={""}> </option>
          {this.state.allOcupation.map((item, index) => (
            <option key={item["grupo"]} value={item["grupo"]}>
              {item["GRUPO DE OCUPACION"]}
            </option>
          ))}
        </select>
        <br />
        <strong>{this.state.result}</strong>
        <br />
        <button type="button" onClick={this.onSubmit}>
          Calcular
        </button>
      </div>
    );
  }
}

export default App;
