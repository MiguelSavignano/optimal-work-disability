import React, { Component } from "react";
import { Footer } from "./_Footer"

export default class Confirmationform extends Component {
  state = { };

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
              <Footer />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
