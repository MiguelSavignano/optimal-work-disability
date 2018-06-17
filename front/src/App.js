import React, { Component } from "react";
import Select from "react-virtualized-select";

import "./App.scss";
import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";

const API_URL =
  process.env.NODE_ENV == "production"
    ? "https://optimal-work-disability.herokuapp.com"
    : "http://localhost:5000";

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
              <h3 className="title has-text-grey">
                Cálculo de incapacidad temporal
              </h3>
              {/* <p className="subtitle has-text-grey">Please login to proceed.</p> */}
              <div className="box">
                <figure className="avatar">
                  <i className="fas fa-user-md" />
                </figure>
                <form onSubmit={this.onSubmit}>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="" className="label">
                        Tipo de enfermedad:
                      </label>
                      <Select
                        value={this.state.form.code}
                        required
                        onChange={this.setSelectValue("code")}
                        options={this.state.allDiseases.map(i => ({
                          value: i["CODIGO"],
                          label: i["DESCRIPCION"]
                        }))}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="" className="label">
                        Grupo de ocupación:
                      </label>
                      <Select
                        value={this.state.form.ocupation_code}
                        required
                        onChange={this.setSelectValue("ocupation_code")}
                        options={this.state.allOcupation.map(i => ({
                          value: i["grupo"],
                          label: i["GRUPO DE OCUPACION"]
                        }))}
                      />
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <label htmlFor="" className="label">
                            Rango de edad:
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
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <label htmlFor="" className="label">
                            Genero:
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
                        </div>
                      </div>
                    </div>
                  </div>

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
              </div>
              <p className="has-text-grey">
                <a href="http://www.seg-social.es/Internet_1/LaSeguridadSocial/Publicaciones/Publicacionesporcon28156/Informacionsobrepen47075/Incapacidadtemporal/index.htm#documentoXLSM">
                  Más información
                </a>{" "}
                &nbsp;·&nbsp;
                <a href="http://www.seg-social.es/prdi00/groups/public/documents/binario/122970.pdf">
                  Manual de Tiempos Óptimos de Incapacidad Temporal.
                </a>{" "}
                &nbsp;·&nbsp;
                <a href="http://www.seg-social.es">Ayuda?</a>
              </p>
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

export default App;
