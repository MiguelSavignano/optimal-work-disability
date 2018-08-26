import React, { Component } from "react";
import { calculateDatesList } from "../models/confirmation_form"
import "../css/App.scss";
import { Footer } from "./_Footer"
import * as UI from "../ui/uikit"

export default class Home extends Component {
  state = { dateList: [], form: { date_start: "", estimated_time: "" } }

  setValue = name => event => {
    this.setState({
      form: { ...this.state.form, [name]: event.target.value }
    });
  };

  onSubmit = (event) => {
    event.preventDefault()
    const { date_start, estimated_time } = this.state.form
    const dateList = calculateDatesList(date_start, estimated_time)
    this.setState({dateList: dateList.map(d => d.format("YYYY-MM-DD")) })
  }

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
                  <UI.Field className="is-horizontal">
                    <UI.FieldBody className="field-body">
                      <UI.Field>
                        <UI.Control>
                          <label htmlFor="" className="label">
                            Fecha de baja*:
                          </label>
                          <input type="date" required className="input" name="date_start" onChange={this.setValue("date_start")} />
                        </UI.Control>
                      </UI.Field>
                      <UI.Field>
                        <UI.Control>
                          <label htmlFor="" className="label">
                            Dias de baja estimados*:
                          </label>
                          <input type="number" min="0" max="365" required className="input" name="estimated_time" onChange={this.setValue("estimated_time")}/>
                        </UI.Control>
                      </UI.Field>
                    </UI.FieldBody>
                  </UI.Field>
                  <button
                    type="submit"
                    className="button button--big is-info is-large"
                  >
                    Calcular
                  </button>
                  {this.state.dateList.length != 0 && (
                    <React.Fragment>
                      <hr />
                      <h4 className="title has-text-grey">
                        Tus partes de baja deben ser entregados en las siguientes fechas
                      </h4>
                      <ul>
                        {this.state.dateList.map( (date) => (
                          <li key={date} >{date}</li>
                        ))}
                      </ul>
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
