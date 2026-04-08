import React from "react";

export const Footer = () => (
  <div className="footer-links has-text-grey">
    <p className="footer-brand">
      Herramienta no oficial basada en las tablas de la Seguridad Social española.
    </p>
    <p className="footer-copy">© {new Date().getFullYear()} — Datos: 4ª Edición INSS</p>
    <a
      href="https://www.seg-social.es/Internet_1/LaSeguridadSocial/Publicaciones/Publicacionesporcon28156/Informacionsobrepen47075/Incapacidadtemporal/index.htm#documentoXLSM"
      rel="noopener noreferrer"
      target="_blank"
    >
      Más información
    </a>
    <span aria-hidden="true">&nbsp;·&nbsp;</span>
    <a
      href="https://www.seg-social.es/prdi00/groups/public/documents/binario/122970.pdf"
      rel="noopener noreferrer"
      target="_blank"
    >
      Manual de Tiempos Óptimos de Incapacidad Temporal.
    </a>
    <span aria-hidden="true">&nbsp;·&nbsp;</span>
    <a
      href="https://www.seg-social.es/prdi00/groups/public/documents/binario/122970.pdf"
      rel="noopener noreferrer"
      target="_blank"
    >
      Documentación
    </a>
  </div>
);
