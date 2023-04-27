import { deleteDBDoc, getDBDocsWhere } from "@/services/dbServices";
import {
  MyDeleteIconButton,
  MyEditIconButton,
  MyButton,
} from "@/components/myButtons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CoreLayout from "@/components/coreLayout";

export default function ExpiredMedicinePage() {
  const router = useRouter();
  const [medicine, setMedicine] = useState([]);

  const handleDelete = async ({ id }) => {
    await deleteDBDoc("stock", id, medicine, setMedicine);
  };

  useEffect(() => {
    const getMedicine = async () => {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      let formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate);
      const items = await getDBDocsWhere(
        "stock",
        "expiryDate",
        "<=",
        formattedDate
      );
      console.log(items);
      setMedicine(items);
    };
    getMedicine();
  }, []);

  return (
    <CoreLayout>
      <div className="wrapper">
        <div className="flex justify-between">
          <h1 className="text-lg">Expired Medicines</h1>
          <MyButton onClick={() => router.push("/stock/create")}>
            Add Stock
          </MyButton>
        </div>
        <div className="flex flex-col mt-5">
          <div className="overflow-x-auto">
            <div className="p-0 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col">Medicine Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Price (TZS)</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">% Discount</th>
                      <th scope="col">Expiry Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {medicine &&
                      medicine.map((st) => {
                        return (
                          <tr
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            key={st.id}
                          >
                            <td>{st.name}</td>
                            <td>{st.category}</td>
                            <td>{st.price}</td>
                            <td>{st.quantity}</td>
                            <td>{st.discount}</td>
                            <td>{st.expiryDate}</td>
                            <td>
                              <MyEditIconButton
                                onClick={() => {
                                  router.push("/medicine/" + st.id + "/edit/");
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
