import React, { useState } from "react";
import { calculateDatesList, getLastControlDay } from "../models/confirmation_form";
import "../css/App.scss";
import { Footer } from "./_Footer";
import * as UI from "../ui/uikit";

export default function ConfirmationForm() {
  const [form, setForm] = useState({ date_start: "", estimated_time: "" });
  const [dateList, setDateList] = useState([]);
  const [lastControlDay, setLastControlDay] = useState(null);

  const setValue = (name) => (event) => {
    setForm((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { date_start, estimated_time } = form;
    const dates = calculateDatesList(date_start, estimated_time);
    const lastDay = getLastControlDay(date_start, estimated_time);
    setDateList(dates);
    setLastControlDay(lastDay);
  };

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
                <i className="fas fa-user-md" aria-hidden="true" />
              </figure>
              <form onSubmit={onSubmit}>
                <UI.Field className="is-horizontal">
                  <UI.FieldBody className="field-body">
                    <UI.Field>
                      <UI.Control>
                        <label htmlFor="date-start" className="label">
                          Fecha de baja*:
                        </label>
                        <input
                          id="date-start"
                          type="date"
                          required
                          className="input"
                          name="date_start"
                          onChange={setValue("date_start")}
                        />
                      </UI.Control>
                    </UI.Field>
                    <UI.Field>
                      <UI.Control>
                        <label htmlFor="estimated-time" className="label">
                          Dias de baja estimados*:
                        </label>
                        <input
                          id="estimated-time"
                          type="number"
                          min="0"
                          max="365"
                          required
                          className="input"
                          name="estimated_time"
                          onChange={setValue("estimated_time")}
                        />
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
                {dateList.length !== 0 && (
                  <React.Fragment>
                    <hr />
                    <h4 className="title has-text-grey">
                      Tus partes de baja deben ser entregados en las siguientes fechas
                    </h4>
                    <ul>
                      {dateList.map((date) => (
                        <li key={date}>{date}</li>
                      ))}
                    </ul>
                    <hr />
                    {lastControlDay && (
                      <h4 className="title has-text-grey">
                        La fecha del ultima revisión debe ser {lastControlDay}
                      </h4>
                    )}
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
