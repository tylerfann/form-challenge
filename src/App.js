import React, { Component } from "react";
import "./App.css";
import Form from "./components/Form";
import { formFields } from "./lib/formFields";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      petName: "",
      petWeight: "",
      idealPetWeight: "",
      showErrors: false,
      errors: {
        emailError: true,
        passwordError: true,
        confirmPasswordError: true,
        petNameError: true,
        petWeightError: true,
        idealPetWeightError: true,
      },
      responseMessage: '',
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  validatePassword = (password) => {
    if (
      password.length >= 8 &&
      /\d/g.test(password) &&
      /[a-zA-Z]/g.test(password) &&
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g.test(password)
    ) {
      return true;
    }
    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      password,
      confirmPassword,
      petName,
      petWeight,
      idealPetWeight,
    } = this.state;

    //validations

    //email
    const noEmailError = /\S+@\S+\.\S+/.test(email);

    // password
    let noPasswordError = false;
    if (this.validatePassword(password)) {
      noPasswordError = true;
    }

    // confirm password
    const noConfirmPasswordError =
      this.validatePassword(confirmPassword) && confirmPassword === password;

    // pet name
    const noPetNameError = petName.length > 0;

    // pet weight
    let noPetWeightError = false;
    const petWeightNum = parseInt(petWeight);
    if (petWeightNum > 2 && petWeightNum < 181) {
      noPetWeightError = true;
    }

    // ideal pet weight
    let noIdealPetWeightError = false;
    if (idealPetWeight.length) {
      const idealPetWeightNum = parseInt(idealPetWeight);
      if (idealPetWeightNum > 2 && idealPetWeightNum < 181) {
        noIdealPetWeightError = true;
      }
    } else {
      noIdealPetWeightError = true;
    }

    const newState = {
      ...this.state,
      showErrors: true,
      errors: {
        emailError: noEmailError ? false : true,
        passwordError: noPasswordError ? false : true,
        confirmPasswordError: noConfirmPasswordError ? false : true,
        petNameError: noPetNameError ? false : true,
        petWeightError: noPetWeightError ? false : true,
        idealPetWeightError: noIdealPetWeightError ? false : true,
      },
    };

    this.setState(newState, async () => {
      // check if no errors before sending data
      const { errors } = this.state;
      const {
        emailError,
        passwordError,
        confirmPasswordError,
        petNameError,
        petWeightError,
        idealPetWeightError,
      } = errors;
      const errorArr = [
        emailError,
        passwordError,
        confirmPasswordError,
        petNameError,
        petWeightError,
        idealPetWeightError,
      ];
      if (!errorArr.includes(true)) {
        const url =
          "https://5r2cql08l4.execute-api.us-east-1.amazonaws.com/register";
        const body = {
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          petName: this.state.petName,
          petWeight: this.state.petWeight,
          idealPetWeight: this.state.idealPetWeight,
        };
        try {
          const response = await axios.post(url, body);
          if (response) {
            this.setState({responseMessage: 'You have submitted the form succuessfully!'});
          }
        } catch (err) {
          if (err.response.status === 400) {
            this.setState({responseMessage: err.response.data.message});
          } else {
            this.setState({responseMessage: 'Sorry, something went wrong please submit again.'});
          }
        }
      }
    });
  };

  render() {
    return (
      <div className="app">
        <div className="image-wrapper">
          <img
            className="image"
            src="https://via.placeholder.com/600"
            alt="placeholder"
          />
        </div>
        <div className="form-wrapper">
         {this.state.responseMessage && <h1>{this.state.responseMessage}</h1>}
          <Form
            onHandleSubmit={this.handleSubmit}
            onHandleChange={this.handleChange}
            formFields={formFields}
            errors={this.state.errors}
            showErrors={this.state.showErrors}
          />
        </div>
      </div>
    );
  }
}
