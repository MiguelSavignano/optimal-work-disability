import React, { useState, useEffect } from "react";
import Select from "react-virtualized-select";
import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";

import "../css/App.scss";
import { Footer } from "./_Footer";
import * as Api from "../models/work_disability";
import * as UI from "../ui/uikit";

const roundResult = (str) => {
  const number = parseFloat(str);
  return Number(number.toFixed(1));
};

export default function Home() {
  const [allDiseases, setAllDiseases] = useState([]);
  const [allAgeRage, setAllAgeRage] = useState([]);
  const [allGenderRage, setAllGenderRage] = useState([]);
  const [allOcupation, setAllOcupation] = useState([]);
  const [form, setForm] = useState({});
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      Api.allDiseases(),
      Api.allAgeRage(),
      Api.allGenderRage(),
      Api.allOcupation(),
    ])
      .then(([diseases, ageRage, genderRage, ocupation]) => {
        setAllDiseases(diseases);
        setAllAgeRage(ageRage);
        setAllGenderRage(genderRage);
        setAllOcupation(ocupation);
      })
      .catch((err) => {
        setError("Error al cargar los datos. Por favor, recarga la página.");
        console.error("Data fetch error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const setSelectValue = (name) => (selectedOption) => {
    setForm((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const setValue = (name) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    try {
      const resultValue = await Api.submitOptimalTime(form);
      setResult(resultValue);
    } catch (err) {
      setSubmitError("Error al calcular el tiempo. Por favor, inténtalo de nuevo.");
      console.error("Submit error:", err);
    }
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

              {isLoading && <p>Cargando...</p>}
              {error && <p className="error">{error}</p>}

              {!isLoading && !error && (
                <form onSubmit={onSubmit}>
                  <UI.Field>
                    <UI.Control>
                      <label htmlFor="disease-select" className="label">
                        Tipo de enfermedad*:
                      </label>
                      <Select
                        inputProps={{ id: "disease-select" }}
                        value={form.code}
                        required
                        onChange={setSelectValue("code")}
                        options={allDiseases.map((i) => ({
                          value: i["codigo"],
                          label: i["descripcion"],
                        }))}
                      />
                    </UI.Control>
                  </UI.Field>

                  <UI.Field>
                    <div className="control">
                      <label htmlFor="ocupation-select" className="label">
                        Grupo de ocupación*:
                      </label>
                      <Select
                        inputProps={{ id: "ocupation-select" }}
                        value={form.ocupation_code}
                        required
                        onChange={setSelectValue("ocupation_code")}
                        options={allOcupation.map((i) => ({
                          value: i["grupo"],
                          label: i["grupo_de_ocupacion"],
                        }))}
                      />
                    </div>
                  </UI.Field>

                  <UI.Field className="is-horizontal">
                    <UI.FieldBody className="field-body">
                      <UI.Field>
                        <UI.Control>
                          <label htmlFor="age-rage-select" className="label">
                            Rango de edad*:
                          </label>
                          <select
                            id="age-rage-select"
                            className="input is-medium"
                            required
                            onChange={setValue("age_rage")}
                          >
                            <option value=""> </option>
                            {allAgeRage.map((item) => (
                              <option key={item["name"]} value={item["name"]}>
                                {item["name"]}
                              </option>
                            ))}
                          </select>
                        </UI.Control>
                      </UI.Field>

                      <UI.Field>
                        <UI.Control>
                          <label htmlFor="gender-select" className="label">
                            Genero*:
                          </label>
                          <select
                            id="gender-select"
                            className="input is-medium"
                            required
                            onChange={setValue("gender")}
                          >
                            <option value=""> </option>
                            {allGenderRage.map((item) => (
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
                      <label htmlFor="second-disease-select" className="label">
                        Enfermedades adicionales (opcional):
                      </label>
                      <Select
                        inputProps={{ id: "second-disease-select" }}
                        value={form.second_code}
                        onChange={setSelectValue("second_code")}
                        options={allDiseases.map((i) => ({
                          value: i["codigo"],
                          label: i["descripcion"],
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

                  {submitError && <p className="error">{submitError}</p>}

                  {result && (
                    <React.Fragment>
                      <hr />
                      <h4 className="title has-text-grey">
                        El tiempo estimado es {roundResult(result)} días
                      </h4>
                    </React.Fragment>
                  )}
                </form>
              )}
            </UI.Box>
            <Footer />
          </div>
        </div>
      </div>
    </section>
  );
}
