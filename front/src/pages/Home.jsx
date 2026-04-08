import React, { useState, useEffect } from "react";
import Select from "react-virtualized-select";
import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";

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
              Cálculo del tiempo óptimo de una incapacidad temporal
            </h2>
            <p className="edition-note has-text-grey">
              Tablas de la 4ª Edición (2018) de la Seguridad Social
            </p>
            <UI.Box>
              {isLoading && <p>Cargando...</p>}
              {error && <p className="error">{error}</p>}

              {!isLoading && !error && (
                <form onSubmit={onSubmit}>
                  <div className="card-header-icon">
                    <i className="fas fa-user-md" aria-hidden="true" />
                    <span>Calculadora de Incapacidad Temporal</span>
                  </div>

                  <UI.Field>
                    <UI.Control>
                      <label htmlFor="disease-select" className="label">
                        Tipo de enfermedad <span className="required-mark" aria-hidden="true">*</span>{' '}
                        <span
                          className="tooltip-hint"
                          title="Selecciona la enfermedad o patología principal según los códigos de la Seguridad Social"
                        >
                          ⓘ
                        </span>
                      </label>
                      <Select
                        inputProps={{ id: "disease-select" }}
                        aria-label="Tipo de enfermedad"
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
                        Grupo de ocupación <span className="required-mark" aria-hidden="true">*</span>{' '}
                        <span
                          className="tooltip-hint"
                          title="Grupo ocupacional según la clasificación de la Seguridad Social española"
                        >
                          ⓘ
                        </span>
                      </label>
                      <Select
                        inputProps={{ id: "ocupation-select" }}
                        aria-label="Grupo de ocupación"
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

                  <UI.Field>
                    <UI.Control>
                      <label htmlFor="age-rage-select" className="label">
                        Rango de edad <span className="required-mark" aria-hidden="true">*</span>
                      </label>
                      <Select
                        inputProps={{ id: "age-rage-select" }}
                        aria-label="Rango de edad"
                        value={form.age_rage}
                        required
                        placeholder="Selecciona..."
                        onChange={setSelectValue("age_rage")}
                        options={allAgeRage.map((item) => ({
                          value: item["name"],
                          label: item["name"],
                        }))}
                      />
                    </UI.Control>
                  </UI.Field>

                  <UI.Field>
                    <UI.Control>
                      <label htmlFor="gender-select" className="label">
                        Genero <span className="required-mark" aria-hidden="true">*</span>
                      </label>
                      <Select
                        inputProps={{ id: "gender-select" }}
                        aria-label="Genero"
                        value={form.gender}
                        required
                        placeholder="Selecciona..."
                        onChange={setSelectValue("gender")}
                        options={allGenderRage.map((item) => ({
                          value: item["name"],
                          label: item["name"],
                        }))}
                      />
                    </UI.Control>
                  </UI.Field>

                  <UI.Field>
                    <UI.Control>
                      <label htmlFor="second-disease-select" className="label">
                        Enfermedad adicional (opcional):
                      </label>
                      <Select
                        inputProps={{ id: "second-disease-select" }}
                        aria-label="Enfermedad adicional"
                        value={form.second_code}
                        onChange={setSelectValue("second_code")}
                        options={allDiseases.map((i) => ({
                          value: i["codigo"],
                          label: i["descripcion"],
                        }))}
                      />
                    </UI.Control>
                  </UI.Field>

                  <p className="required-legend">
                    <span className="required-mark" aria-hidden="true">*</span> Campos obligatorios
                  </p>

                  <button
                    type="submit"
                    className="button button--big is-info is-large"
                  >
                    Calcular
                  </button>

                  {submitError && <p className="error">{submitError}</p>}

                  <div className="result-area">
                    {result ? (
                      <>
                        <hr />
                        <p className="result-label">Tiempo óptimo estimado:</p>
                        <p className="result-value">{roundResult(result)} días</p>
                      </>
                    ) : (
                      <p className="result-placeholder">El resultado aparecerá aquí tras calcular.</p>
                    )}
                  </div>
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
