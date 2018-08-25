import React, { Component } from "react";
import Select from "react-virtualized-select";
import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";

import "../css/App.scss";
import { Footer } from "./_Footer"
import * as Api from "../models/work_disability"
import * as UI from "../ui/uikit"

const API_URL =
process.env.NODE_ENV == "production"
  ? "https://incapacidad-temporal-optima.herokuapp.com/"
  : "http://localhost:5000";

export default class Home extends Component {
  state = {
    allDiseases: [],
    allAgeRage: [],
    allGenderRage: [],
    allOcupation: [],
    form: {},
    result: ""
  }

  async componentDidMount() {
    const allDiseases = await Api.allDiseases()
    this.setState({ allDiseases })
    const allAgeRage = await Api.allAgeRage()
    this.setState({ allAgeRage })
    const allGenderRage = await Api.allGenderRage()
    this.setState({ allGenderRage })
    const allOcupation = await Api.allOcupation()
    this.setState({ allOcupation })
  }

  setSelectValue = name => selectedOption => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: selectedOption ? selectedOption.value : ""
      }
    });
  };

  setValue = name => event => {
    this.setState({
      form: { ...this.state.form, [name]: event.target.value }
    });
  };

  onSubmit = event => {
    event.preventDefault();
    var self = this;
    var data = JSON.stringify(this.state.form);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        self.setState({ result: JSON.parse(this.responseText).result });
      }
    });

    xhr.open("POST", `${API_URL}/optimal-time`);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
  };

  render() {
    return (
      <section className="hero is-success is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-10 is-offset-1">
              <h1 className="title has-text-grey">
                Tiempos Óptimos de Incapacidad Temporal
              </h1>
              <h2 className="subtitle has-text-grey">
                Cálculo del tiempo óptimo de una incapacidad temporal (4ª
                Edición) 2018
              </h2>
              <UI.Box>
                <figure className="avatar">
                  <i className="fas fa-user-md" />
                </figure>
                <form onSubmit={this.onSubmit}>
                  <UI.Field>
                    <UI.Control>
                      <label htmlFor="" className="label">
                        Tipo de enfermedad*:
                      </label>
                      <Select
                        value={this.state.form.code}
                        required
                        onChange={this.setSelectValue("code")}
                        options={this.state.allDiseases.map(i => ({
                          value: i["codigo"],
                          label: i["descripcion"]
                        }))}
                      />
                    </UI.Control>
                  </UI.Field>
                  <UI.Field>
                    <div className="control">
                      <label htmlFor="" className="label">
                        Grupo de ocupación*:
                      </label>
                      <Select
                        value={this.state.form.ocupation_code}
                        required
                        onChange={this.setSelectValue("ocupation_code")}
                        options={this.state.allOcupation.map(i => ({
                          value: i["grupo"],
                          label: i["grupo_de_ocupacion"]
                        }))}
                      />
                    </div>
                  </UI.Field>
                  <UI.Field className="is-horizontal">
                    <UI.FieldBody className="field-body">
                      <UI.Field>
                        <UI.Control>
                          <label htmlFor="" className="label">
                            Rango de edad*:
                          </label>
                          <select
                            className="input is-medium"
                            required
                            onChange={this.setValue("age_rage")}
                          >
                            <option value={""}> </option>
                            {this.state.allAgeRage.map((item, index) => (
                              <option key={item["name"]} value={item["name"]}>
                                {item["name"]}
                              </option>
                            ))}
                          </select>
                        </UI.Control>
                      </UI.Field>
                      <UI.Field>
                        <UI.Control>
                          <label htmlFor="" className="label">
                            Genero*:
                          </label>
                          <select
                            className="input is-medium"
                            required
                            onChange={this.setValue("gender")}
                          >
                            <option value={""}> </option>
                            {this.state.allGenderRage.map((item, index) => (
                              <option key={item["name"]} value={item["name"]}>
                                {item["name"]}
                              </option>
                            ))}
                          </select>
                        </UI.Control>
                      </UI.Field>
                    </UI.FieldBody>
                  </UI.Field>
                  <UI.Field>
                    <UI.Control>
                      <label htmlFor="" className="label">
                        Enfermedade adicional (opcional):
                      </label>
                      <Select
                        value={this.state.form.second_code}
                        onChange={this.setSelectValue("second_code")}
                        options={this.state.allDiseases.map(i => ({
                          value: i["codigo"],
                          label: i["descripcion"]
                        }))}
                      />
                    </UI.Control>
                  </UI.Field>
                  <button
                    type="submit"
                    className="button button--big is-info is-large"
                  >
                    Calcular
                  </button>
                  {this.state.result && (
                    <React.Fragment>
                      <hr />
                      <h4 className="title has-text-grey">
                        El tiempo estimado es {roundResult(this.state.result)}{" "}
                        días
                      </h4>
                    </React.Fragment>
                  )}
                </form>
              </UI.Box>
              <Footer />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const roundResult = str => {
  const number = parseFloat(str);
  return Number(number.toFixed(1));
};
