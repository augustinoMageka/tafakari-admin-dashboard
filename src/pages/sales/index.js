import { Formik, Form } from "formik";
import { MySelect, MyTextField } from "@/components/myInputs";
import { salesValidationSchema } from "@/utils/validationSchemas";
import {
  MyDeleteIconButton,
  MyEditIconButton,
  MyButton,
} from "@/components/myButtons";
import { useState, useEffect } from "react";
import { serverTimestamp } from "firebase/firestore";
import { addDBDoc, deleteDBDoc, getDBDocs } from "@/services/dbServices";
import { useRouter } from "next/navigation";
import { months } from "@/utils/months";
import CoreLayout from "@/components/coreLayout";

const fields = [
  { name: "medicine", type: "text", isSelect: true },
  { name: "quantity", type: "number" },
];

export default function SalesPage() {
  const router = useRouter();
  const [sales, setSales] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (values, { resetForm }) => {
    const chosenMedicine = medicine.find((med) => med.name == values.medicine);
    const totalPrice = chosenMedicine.discount
      ? chosenMedicine.price *
        values.quantity *
        (1 - chosenMedicine.discount / 100)
      : chosenMedicine.price * values.quantity;
    await addDBDoc(
      "sales",
      {
        ...values,
        date: serverTimestamp(),
        unitPrice: chosenMedicine.price,
        totalPrice,
        discount: chosenMedicine.discount,
      },
      { resetForm },
      setLoading,
      sales,
      setSales
    );
  };

  const handleDelete = async ({ id }) => {
    await deleteDBDoc("sales", id, sales, setSales);
  };

  useEffect(() => {
    const getMedicine = async () => {
      const items = await getDBDocs("stock");
      setMedicine(items);
    };
    const getSales = async () => {
      const items = await getDBDocs("sales", "date", "desc");
      setSales(items);
    };
    getMedicine();
    getSales();
  }, []);

  return (
    <CoreLayout>
      <div className="wrapper">
        <div className="flex justify-between">
          <h1 className="text-lg">Sales</h1>
        </div>
        <Formik
          initialValues={{
            medicine: "",
            quantity: "",
          }}
          validationSchema={salesValidationSchema}
          onSubmit={handleAdd}
        >
          {({ errors, touched }) => (
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
                      options={medicine || []}
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
                <MyButton loading={loading}>Add Sale</MyButton>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex flex-col mt-5">
          <div className="overflow-x-auto">
            <div className="p-0 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col">Medicine Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Unit Price (TZS)</th>
                      <th scope="col">Discount (%)</th>
                      <th scope="col">Total Price (TZS)</th>
                      <th scope="col">Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {sales &&
                      sales.map((st) => {
                        return (
                          <tr
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            key={st.id}
                          >
                            <td>{st.medicine}</td>
                            <td>{st.quantity}</td>
                            <td>{st.unitPrice}</td>
                            <td>{st.discount}</td>
                            <td>{st.totalPrice}</td>
                            <td>
                              {st.tempDate ||
                                `
                            ${st.date.toDate().getDate()} 
                            ${months[st.date.toDate().getMonth()]}
                            ${st.date.toDate().getFullYear()}
                            `}
                            </td>
                            <td>
                              <MyEditIconButton
                                onClick={() => {
                                  router.push("/sales/" + st.id + "/edit/");
                                }}
                              />
                              <MyDeleteIconButton
                                onClick={handleDelete}
                                item={st}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CoreLayout>
  );
}
