import React from "react";
import "./FormField.css";

const FormField = (props) => {
  const { error, label, placeholder, required, type } = props;
  return (
    <div className="field-wrapper">
      {label && (
        <label className="field-label" htmlFor={props.name}>
          {label} <span> {required ? `(required)` : `(optional)`}</span>
        </label>
      )}
      {error && <label className='error-text'>Error: Please correct field</label>}
      <input
        placeholder={placeholder}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        type={type}
        className='field-input'
        style={props.style}
      />
    </div>
  );
};

export default FormField;
