import { deleteDBDoc, getDBDocsWhere } from "@/services/dbServices";
import {
  MyDeleteIconButton,
  MyEditIconButton,
  MyButton,
} from "@/components/myButtons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CoreLayout from "@/components/coreLayout";

export default function StockPage() {
  const router = useRouter();
  const [stock, setStock] = useState([]);

  const handleDelete = async ({ id }) => {
    await deleteDBDoc("stock", id, stock, setStock);
  };

  useEffect(() => {
    const getStock = async () => {
      const items = await getDBDocsWhere("stock", "quantity", "==", 0);
      setStock(items);
    };
    getStock();
  }, []);

  return (
    <CoreLayout>
      <div className="wrapper">
        <div className="flex justify-between">
          <h1 className="text-lg">Out of Stock</h1>
          <MyButton onClick={() => router.push("/stock/create")}>
            Add stock
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
                      <th scope="col">Supplier</th>
                      <th scope="col">Category</th>
                      <th scope="col">Price (TZS)</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">% Discount</th>
                      <th scope="col">Expiry Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {stock &&
                      stock.map((st) => {
                        return (
                          <tr
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            key={st.id}
                          >
                            <td>{st.medicine}</td>
                            <td>{st.supplier}</td>
                            <td>{st.category}</td>
                            <td>{st.price}</td>
                            <td>{st.quantity}</td>
                            <td>{st.discount}</td>
                            <td>{st.expiryDate}</td>
                            <td>
                              <MyEditIconButton
                                onClick={() => {
                                  router.push("/stock/" + st.id + "/edit/");
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
