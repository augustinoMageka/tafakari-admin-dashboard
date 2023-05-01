import { Formik, Form } from "formik";
import { useState } from "react";
import { addDBDoc } from "@/services/dbServices";
import { MyButton } from "@/components/myButtons";
import { MyTextField } from "@/components/myInputs";
import { salaValidationSchema } from "@/utils/validationSchemas";
import { somoValidationSchema } from "@/utils/validationSchemas";
import { useRouter } from "next/router";
import CoreLayout from "@/components/coreLayout";

export default function CreatePage({
  collectionName,
  backUrl,
  title,
  isSala = false,
}) {
  const fields = isSala
    ? [
        { name: "title", type: "text", label: "Kichwa", isTextArea: false },
        { name: "content", label: "Kiini", isTextArea: true, type: "text" },
      ]
    : [
        { name: "title", type: "text", label: "Kichwa", isTextArea: false },
        { name: "content", label: "Kiini", isTextArea: true, type: "text" },
        { name: "date", label: "Tarehe ya somo", type: "date" },
      ];
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdd = async (values, { resetForm }) => {
    await addDBDoc(collectionName, values, { resetForm }, setLoading);
    router.push(backUrl);
  };

  return (
    <CoreLayout>
      <Formik
        initialValues={
          isSala
            ? {
                title: "",
                content: "",
              }
            : {
                title: "",
                content: "",
                date: "",
              }
        }
        validationSchema={isSala ? salaValidationSchema : somoValidationSchema}
        onSubmit={handleAdd}
      >
        {({ errors, touched }) => (
          <Form className="wrapper">
            <div className="flex justify-between">
              <h1 className="text-xl">{title}</h1>
              <MyButton onClick={() => router.push(backUrl)}>Rudi</MyButton>
            </div>
            <div className="mt-2">
              {fields.map((field) => {
                return (
                  <div key={field.name} className="mt-3">
                    <MyTextField
                      touched={touched}
                      errors={errors}
                      field={field.name}
                      type={field.type}
                      label={field.label || field.name}
                      textarea={field.isTextArea || false}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <MyButton loading={loading} fullyWide>
                {isSala ? "Ongeza Sala" : "Ongeza Somo"}
              </MyButton>
            </div>
          </Form>
        )}
      </Formik>
    </CoreLayout>
  );
}
