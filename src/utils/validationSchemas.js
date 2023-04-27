import * as Yup from "yup";

export const userRegistrationValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  terms: Yup.array().required("Terms of service must be checked"),
  password: Yup.string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  passwordConfirm: Yup.string("Enter password confirmation").oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  role: Yup.string().required("Select a role"),
});

export const stockValidationSchema = Yup.object().shape({
  name: Yup.string().required("Medicine is required"),
  supplier: Yup.string()
    .required("Supplier name is required")
    .notOneOf(["Please select supplier"], "Supplier is required"),
  category: Yup.string()
    .required("Category is required")
    .notOneOf(["Please select category"], "Category is required"),
  price: Yup.number("Invalid entry").required("Price is required"),
  quantity: Yup.number("Invalid entry").required("Quantity is required"),
  discount: Yup.number("Invalid entry").required("Discount is required"),
  expiryDate: Yup.date("Invalid date").required("Expiry date is required"),
});

export const salesValidationSchema = Yup.object().shape({
  medicine: Yup.string().required("Medicine is required"),
  quantity: Yup.number("Invalid entry").required("Quantity is required"),
});

export const suppliersValidationSchema = Yup.object().shape({
  name: Yup.string().required("Supplier name is required"),
  medicine: Yup.string()
    .required("Medicine is required")
    .notOneOf(["Please select medicine"], "Medicine is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  company: Yup.string().required("Company is required"),
  address: Yup.string().required("Address is required"),
});

export const categoryValidationSchema = Yup.object().shape({
  name: Yup.string().required("Category is required"),
});
