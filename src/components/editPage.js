import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { getDBDoc, updateDBDoc } from "@/services/dbServices";
import { MyTextField } from "@/components/myInputs";
import { MyButton } from "@/components/myButtons";
import CoreLayout from "@/components/coreLayout";
import {
  salaValidationSchema,
  somoValidationSchema,
} from "@/utils/validationSchemas";

export default function EditPage({ backUrl, collectionName, isSala = false }) {
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [oldItem, setoldItem] = useState({});
  const pathname = usePathname();

  useEffect(() => {
    const id = pathname.split("/")[3];
    const getSala = async () => {
      const item = await getDBDoc(collectionName, id);
      // if (!item) router.push("/notFound");
      setoldItem(item);
    };
    getSala();
  }, []);

  const handleEdit = async (values) => {
    await updateDBDoc(
      collectionName,
      { ...oldItem, ...values },
      oldItem.id,
      setLoading
    );
  };

  return (
    <CoreLayout>
      <Formik
        enableReinitialize
        initialValues={
          isSala
            ? {
                title: oldItem.title || "",
                content: oldItem.content || "",
              }
            : {
                title: oldItem.title || "",
                content: oldItem.content || "",
                date: oldItem.date || "",
              }
        }
        validationSchema={isSala ? salaValidationSchema : somoValidationSchema}
        onSubmit={handleEdit}
      >
        {({ errors, touched }) => (
          <div className="wrapper">
            <div className="flex justify-between">
              <h1 className="text-lg">Hariri</h1>
              <MyButton onClick={() => router.push(backUrl)}>Rudi</MyButton>
            </div>
            <Form>
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
              <div className="mt-4">
                <MyButton loading={loading} fullyWide>
                  Hariri
                </MyButton>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </CoreLayout>
  );
}
