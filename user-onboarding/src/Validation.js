// Here goes the schema for the form
import * as yup from "yup";

export default yup.object().shape({
  name: yup
    .string()
    .required("Username is required.")
    .min(3, "Username must be 3 chars long."),
  email: yup
    .string()
    .email("Must be valid email address.")
    .required("Must include email address."),
  password: yup
    .string()
    .required("Password is required.")
    .min(3, "Password must be 3 chars long."),
  terms: yup
    .boolean()
    .oneOf([true], "Field must be checked"),
});