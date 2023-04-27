import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { suppliersValidationSchema } from "@/utils/validationSchemas";
import { getDBDoc, updateDBDoc } from "@/services/dbServices";
import { MyTextField, MySelect } from "@/components/myInputs";
import { MyButton } from "@/components/myButtons";
import CoreLayout from "@/components/coreLayout";

export default function EditMedicinePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [oldSupplier, setOldSupplier] = useState({});
  const pathname = usePathname();
  const fields = [
    { name: "name", type: "text" },
    { name: "medicine", type: "text" },
    { name: "email", type: "email" },
    { name: "phone", type: "text" },
    { name: "company", type: "text" },
    { name: "address", type: "text" },
  ];

  useEffect(() => {
    const id = pathname.split("/")[2];
    const getSupplier = async () => {
      const item = await getDBDoc("suppliers", id);
      // if (!item) router.push("/notFound");
      setOldSupplier(item);
    };
    getSupplier();
  }, []);

  const handleEdit = async (values) => {
    await updateDBDoc("suppliers", values, oldSupplier.id, setLoading);
  };

  return (
    <CoreLayout>
      <Formik
        enableReinitialize
        initialValues={{
          name: oldSupplier.name || "",
          medicine: oldSupplier.medicine || "",
          email: oldSupplier.email || "",
          phone: oldSupplier.phone || "",
          company: oldSupplier.company || "",
          address: oldSupplier.address || "",
        }}
        validationSchema={suppliersValidationSchema}
        onSubmit={handleEdit}
      >
        {({ errors, touched }) => (
          <div className="wrapper">
            <div className="flex justify-between">
              <h1 className="text-lg">Edit Supplier</h1>
              <MyButton onClick={() => router.push("/suppliers")}>
                Back
              </MyButton>
            </div>
            <Form>
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
                      options={field.items || []}
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
              </div>
              <div className="mt-4">
                <MyButton loading={loading} fullyWide>
                  Edit Supplier
                </MyButton>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </CoreLayout>
  );
}
