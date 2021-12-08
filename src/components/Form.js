import FormField from "./FormField/FormField";

const Form = (props) => {
  return (
    <form onSubmit={props.onHandleSubmit}>
      {props.formFields.map((el, index) => {
        // match the field name with the error key name
        let error = false;
        if (props.showErrors) {
          if (props.errors[`${el.name}Error`]) {
            error = true;
          }
        }

        return (
          <FormField
            value={props.value}
            style={el.style}
            required={el.required}
            placeholder={el.placeholder}
            label={el.label}
            name={el.name}
            type={el.formType}
            key={`${el.name}-${index}`}
            onChange={props.onHandleChange}
            error={error}
          />
        );
      })}
    </form>
  );
};

export default Form;
