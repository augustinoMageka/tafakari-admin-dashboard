import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { salesValidationSchema } from "@/utils/validationSchemas";
import { getDBDoc, getDBDocs, updateDBDoc } from "@/services/dbServices";
import { MyTextField, MySelect } from "@/components/myInputs";
import { MyButton } from "@/components/myButtons";
import CoreLayout from "@/components/coreLayout";

export default function EditMedicinePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [oldSale, setOldSale] = useState({});
  const [medicine, setMedicine] = useState([]);
  const pathname = usePathname();
  const [fields, setFields] = useState([
    { name: "medicine", type: "text", isSelect: true },
    { name: "quantity", type: "number" },
  ]);

  useEffect(() => {
    const id = pathname.split("/")[2];
    const getMedicine = async () => {
      const items = await getDBDocs("stock");
      setMedicine(items);
    };
    const getSale = async () => {
      const item = await getDBDoc("sales", id);
      // if (!item) router.push("/notFound");
      setOldSale(item);
    };
    async function setSelectOptions() {
      const medicine = await getDBDocs("stock");
      const newItems = fields.map((field) => {
        if (field.name == "medicine") {
          return { ...field, items: medicine };
        } else {
          return field;
        }
      });
      setFields(newItems);
    }
    getMedicine();
    getSale();
    setSelectOptions();
  }, []);

  const handleEdit = async (values) => {
    const chosenMedicine = medicine.find((med) => med.name == values.medicine);
    const totalPrice = chosenMedicine.discount
      ? chosenMedicine.price *
        values.quantity *
        (1 - chosenMedicine.discount / 100)
      : chosenMedicine.price * values.quantity;
    await updateDBDoc(
      "sales",
      {
        ...values,
        date: oldSale.date,
        unitPrice: chosenMedicine.price,
        totalPrice,
        discount: chosenMedicine.discount,
      },
      oldSale.id,
      setLoading
    );
  };

  return (
    <CoreLayout>
      <Formik
        enableReinitialize
        initialValues={{
          medicine: oldSale.medicine || "",
          quantity: oldSale.quantity || 0,
        }}
        validationSchema={salesValidationSchema}
        onSubmit={handleEdit}
      >
        {({ errors, touched }) => (
          <div className="wrapper">
            <div className="flex justify-between">
              <h1 className="text-lg">Edit Sale</h1>
              <MyButton onClick={() => router.push("/sales")}>Back</MyButton>
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
                  Edit Sale
                </MyButton>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </CoreLayout>
  );
}
