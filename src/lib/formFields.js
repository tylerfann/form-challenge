export const formFields = [
  {
    label: "Email",
    required: true,
    formType: 'text',
    name: 'email'
  },
  {
    label: "Password",
    required: true,
    formType: 'password',
    placeholder: 'minimum of 8 characters, 1 number, 1 letter and 1 special character',
    name: 'password'
  },
  {
    label: "Confirm Password",
    required: true,
    formType: 'password',
    placeholder: 'minimum of 8 characters, 1 number, 1 letter and 1 special character',
    name: 'confirmPassword'
  },
  {
    label: "Pet Name",
    required: true,
    formType: 'text',
    name: 'petName'
  },
  {
    label: "Pet Weight",
    required: true,
    formType: 'text',
    placeholder: 'Enter a number, minimum of 3lbs and max of 180lbs',
    name: 'petWeight'
  },
  {
    label: "Ideal Pet Weight",
    required: false,
    formType: 'text',
    placeholder: 'Enter a number, minimum of 3lbs and max of 180lbs',
    name: 'idealPetWeight'
  },
  {
    formType: 'submit',
    style: {
      width: '150px',
      alignSelf: 'center',
      fontSize: '20px',
      borderRadius: '5px',
      padding: '5px',
      height: '100%'
    }
  }
];
