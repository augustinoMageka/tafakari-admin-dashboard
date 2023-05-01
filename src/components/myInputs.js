import { Field } from "formik";

export function MyTextField({
  touched,
  errors,
  field,
  label,
  type,
  textarea = false,
}) {
  return (
    <div>
      <label
        htmlFor={field}
        className={`block text-sm mb-2 ${
          touched[field] && errors[field] ? "text-red-400" : ""
        }`}
      >
        {touched[field] && errors[field]
          ? errors[field]
          : label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <Field
        rows={8}
        as={textarea && "textarea"}
        id={field}
        className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-red-500 focus:ring-red-500"
        type={type}
        name={field}
        placeholder={"Enter " + field}
        required
      />
    </div>
  );
}

export function MySelect({ touched, errors, field, label, options }) {
  return (
    <div>
      <label
        htmlFor={field}
        className={`block text-sm mb-2 ${
          touched[field] && errors[field] ? "text-red-400" : ""
        }`}
      >
        {touched[field] && errors[field]
          ? errors[field]
          : label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <Field
        as="select"
        id={field}
        className="py-2.5 block w-full rounded-md text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 border-2 border-gray-500 focus:border-red-500 focus:ring-red-500"
        type="text"
        name={field}
        required
      >
        <option defaultValue>Please select {field}</option>
        {options &&
          options.map((op) => (
            <option key={op.id} value={op.name}>
              {op.name}
            </option>
          ))}
      </Field>
    </div>
  );
}
