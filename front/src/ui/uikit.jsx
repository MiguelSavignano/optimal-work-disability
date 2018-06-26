import React from "react";

export const Box = ({ children, className = "", ...props }) => (
  <div className={`box ${className}`} {...props}>
    {children}
  </div>
);

export const Field = ({ children, className = "", ...props }) => (
  <div className={`field ${className}`} {...props}>
    {children}
  </div>
);

export const FieldBody = ({ children, className = "", ...props }) => (
  <div className={`field-body ${className}`} {...props}>
    {children}
  </div>
);

export const Control = ({ children, className = "", ...props }) => (
  <div className={`control ${className}`} {...props}>
    {children}
  </div>
);
