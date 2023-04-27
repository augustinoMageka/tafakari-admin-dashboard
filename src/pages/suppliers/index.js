import { deleteDBDoc, getDBDocs } from "@/services/dbServices";
import {
  MyDeleteIconButton,
  MyEditIconButton,
  MyButton,
} from "@/components/myButtons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CoreLayout from "@/components/coreLayout";

export default function SuppliersPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState([]);

  const handleDelete = async ({ id }) => {
    await deleteDBDoc("suppliers", id, suppliers, setSuppliers);
  };

  useEffect(() => {
    const getSupplier = async () => {
      const items = await getDBDocs("suppliers");
      setSuppliers(items);
    };
    getSupplier();
  }, []);

  return (
    <CoreLayout>
      <div className="wrapper">
        <div className="flex justify-between">
          <h1 className="text-lg">Suppliers</h1>
          <MyButton onClick={() => router.push("/suppliers/create")}>
            Add supplier
          </MyButton>
        </div>
        <div className="flex flex-col mt-5">
          <div className="overflow-x-auto">
            <div className="p-0 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Medicine</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Company</th>
                      <th scope="col">Address</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {suppliers &&
                      suppliers.map((st) => {
                        return (
                          <tr
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            key={st.id}
                          >
                            <td>{st.name}</td>
                            <td>{st.medicine}</td>
                            <td>{st.email}</td>
                            <td>{st.phone}</td>
                            <td>{st.company}</td>
                            <td>{st.address}</td>
                            <td>
                              <MyEditIconButton
                                onClick={() => {
                                  router.push("/suppliers/" + st.id + "/edit/");
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
