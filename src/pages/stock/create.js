import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { getDBDocs, addDBDoc } from "@/services/dbServices";
import { MyButton } from "@/components/myButtons";
import { MySelect, MyTextField } from "@/components/myInputs";
import { stockValidationSchema } from "@/utils/validationSchemas";
import CoreLayout from "@/components/coreLayout";

const fields = [
  { name: "name", type: "text", label: "Medicine name" },
  { name: "supplier", type: "text", isSelect: true },
  { name: "category", isSelect: true, type: "text" },
  { name: "price", type: "number" },
  { name: "quantity", type: "number" },
  { name: "discount", type: "number" },
  { name: "expiryDate", label: "Expiry Date", type: "date" },
];

export default function AddStockPage() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    async function getSelectOptions() {
      async function getSuppliers() {
        const items = await getDBDocs("suppliers");
        setSuppliers(items);
      }
      async function getCategories() {
        const items = await getDBDocs("categories");
        setCategories(items);
      }
      getSuppliers();
      getCategories();
    }
    getSelectOptions();
  }, []);

  const handleAdd = async (values, { resetForm }) => {
    await addDBDoc("stock", values, { resetForm }, setLoading);
  };

  return (
    <CoreLayout>
      <Formik
        initialValues={{
          name: "",
          supplier: "",
          category: "",
          price: "",
          quantity: "",
          discount: 0,
          expiryDate: "",
        }}
        validationSchema={stockValidationSchema}
        onSubmit={handleAdd}
      >
        {({ errors, touched }) => (
          <Form className="wrapper">
            <h1 className="text-xl">Add Stock</h1>
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
                    options={
                      field.name == "category"
                        ? categories || []
                        : suppliers || []
                    }
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
            <div className="mt-5">
              <MyButton loading={loading} fullyWide>
                Add Stock
              </MyButton>
            </div>
          </Form>
        )}
      </Formik>
    </CoreLayout>
  );
}
