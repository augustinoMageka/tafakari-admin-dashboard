import { Formik, Form } from "formik";
import { useState } from "react";
import { addDBDoc } from "@/services/dbServices";
import { MyButton } from "@/components/myButtons";
import { MySelect, MyTextField } from "@/components/myInputs";
import { suppliersValidationSchema } from "@/utils/validationSchemas";
import CoreLayout from "@/components/coreLayout";

const fields = [
  { name: "name", type: "text" },
  { name: "medicine", type: "text" },
  { name: "email", type: "email" },
  { name: "phone", type: "text" },
  { name: "company", type: "text" },
  { name: "address", type: "text" },
];

export default function AddSupplierPage() {
  const [loading, setLoading] = useState(false);

  const handleAdd = async (values, { resetForm }) =>
    addDBDoc("suppliers", values, { resetForm }, setLoading);

  return (
    <CoreLayout>
      <Formik
        initialValues={{
          name: "",
          medicine: "",
          email: "",
          phone: "",
          company: "",
          address: "",
        }}
        validationSchema={suppliersValidationSchema}
        onSubmit={handleAdd}
      >
        {({ errors, touched }) => (
          <Form className="wrapper">
            <h1 className="text-xl">Add Supplier</h1>
            <div className="grid lg:grid-cols-2 gap-5 mt-4">
              {fields.map((field) => {
                return field.isSelect ? (
                  <MySelect
                    key={field.name}
                    touched={touched}
                    errors={errors}
                    field={field.name}
                    type={field.type}
                    label={field.label || field.name}
                    options={categories || []}
                  />
                ) : (
                  <MyTextField
                    key={field.name}
                    touched={touched}
                    errors={errors}
                    field={field.name}
                    type={field.type}
                    label={field.label || field.name}
                  />
                );
              })}
              <MyButton loading={loading}>Add Supplier</MyButton>
            </div>
          </Form>
        )}
      </Formik>
    </CoreLayout>
  );
}
