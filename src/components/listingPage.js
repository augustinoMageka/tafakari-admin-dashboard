import { deleteDBDoc, getDBDocs } from "@/services/dbServices";
import {
  MyDeleteIconButton,
  MyEditIconButton,
  MyButton,
} from "@/components/myButtons";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import CoreLayout from "@/components/coreLayout";

export default function ListingPage({ collectionName, title, isSala = false }) {
  const router = useRouter();
  const [data, setdata] = useState([]);
  const pathname = usePathname();

  const handleDelete = async ({ id }) => {
    await deleteDBDoc(collectionName, id, data, setdata);
  };

  useEffect(() => {
    const getdata = async () => {
      const items = await getDBDocs(collectionName);
      setdata(items);
    };
    getdata();
  }, []);

  return (
    <CoreLayout>
      <div className="wrapper">
        <div className="flex justify-between">
          <h1 className="text-lg">{title}</h1>
          <MyButton onClick={() => router.push(pathname + "/create")}>
            {isSala ? "Ongeza Sala" : "Ongeza Somo"}
          </MyButton>
        </div>
        <div className="flex flex-col mt-5">
          <div className="overflow-x-auto">
            <div className="p-0 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      {!isSala && <th scope="col">Date</th>}
                      <th scope="col">Title</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data &&
                      data.map((st) => {
                        return (
                          <tr className={`hover:bg-gray-100`} key={st.id}>
                            {!isSala && (
                              <td className="uppercase">{st.date}</td>
                            )}
                            <td className="uppercase">{st.title}</td>
                            <td>
                              <MyEditIconButton
                                onClick={() => {
                                  router.push(
                                    pathname + "/" + st.id + "/edit/"
                                  );
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
