import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import './styles.less'
import Form from "./Form";
import User from "./User"
import Validation from "./Validation";

import axios from "axios";
import * as yup from "yup";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  terms: false,
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  terms: "",
};

const initialUsers = [];
const initialDisabled = true;

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        console.log(res);
        setUsers([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // console.log(users);

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
        setFormValues(initialFormValues);
        // console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const changeIt = (name, value) => {
    yup
      .reach(Validation, name)
      .validate(value)
      .then(() => {
        // console.log(value);
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({...formValues, [name]: value});
  };

  const submitIt = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: true,
    }
    postNewUser(newUser);
  };


  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    Validation.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);


  return (
    <div className="container">
      <header>
        <h1>Add Users</h1>
      </header>

      <Form
        values={formValues}
        change={changeIt}
        submit={submitIt}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.length === 0 ? null : users.map((user) => {
          console.log(user);
          return <User key={user.id} details={user} />;
        })
      }
    </div>
  );
}
