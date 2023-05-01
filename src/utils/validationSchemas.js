import * as Yup from "yup";

export const salaValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

export const somoValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  date: Yup.date().required("Date is required"),
});
