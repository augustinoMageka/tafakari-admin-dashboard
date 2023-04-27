import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { stockValidationSchema } from "@/utils/validationSchemas";
import { getDBDoc, getDBDocs, updateDBDoc } from "@/services/dbServices";
import { MyTextField, MySelect } from "@/components/myInputs";
import { MyButton } from "@/components/myButtons";
import CoreLayout from "@/components/coreLayout";

export default function EditMedicinePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [oldStock, setOldStock] = useState({});
  const pathname = usePathname();
  const [fields, setFields] = useState([
    { name: "name", type: "text" },
    { name: "supplier", type: "text", isSelect: true, items: [] },
    { name: "category", isSelect: true, type: "text", items: [] },
    { name: "price", type: "number" },
    { name: "quantity", type: "number" },
    { name: "discount", type: "number" },
    { name: "expiryDate", label: "Expiry Date", type: "date" },
  ]);

  useEffect(() => {
    const id = pathname.split("/")[2];
    const getStock = async () => {
      const item = await getDBDoc("stock", id);
      // if (!item) router.push("/notFound");
      setOldStock(item);
    };
    async function setSelectOptions() {
      const categories = await getDBDocs("categories");
      const suppliers = await getDBDocs("suppliers");
      const newItems = fields.map((field) => {
        if (field.name == "category") {
          return { ...field, items: categories };
        } else if (field.name == "supplier") {
          return { ...field, items: suppliers };
        } else {
          return field;
        }
      });
      setFields(newItems);
    }
    getStock();
    setSelectOptions();
  }, []);

  const handleEdit = async (values) => {
    await updateDBDoc("stock", values, oldStock.id, setLoading);
  };

  return (
    <CoreLayout>
      <Formik
        enableReinitialize
        initialValues={{
          name: oldStock.name || "",
          supplier: oldStock.supplier || "",
          category: oldStock.category || "",
          price: oldStock.price || 0,
          quantity: oldStock.quantity || 0,
          discount: oldStock.discount || 0,
          expiryDate: oldStock.expiryDate || "",
        }}
        validationSchema={stockValidationSchema}
        onSubmit={handleEdit}
      >
        {({ errors, touched }) => (
          <div className="wrapper">
            <div className="flex justify-between">
              <h1 className="text-lg">Edit Stock</h1>
              <MyButton onClick={() => router.push("/stock")}>Back</MyButton>
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
                  Edit Stock
                </MyButton>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </CoreLayout>
  );
}
