"use client";
import AddCategoryModal from "@/components/addCategoryModal";
import EditCategoryModal from "@/components/editCategoryModal";
import { useUpdateModalContext } from "@/context/modalContext";
import { deleteDBDoc, getDBDocs } from "@/services/dbServices";
import { useState, useEffect } from "react";
import { months } from "@/utils/months";
import CoreLayout from "@/components/coreLayout";
import { MyDeleteIconButton } from "@/components/myButtons";

export default function CategoriesPage() {
  const setModalState = useUpdateModalContext();
  const [categories, setCategories] = useState([]);
  const [oldCategory, setOldCategory] = useState({});

  const handleDelete = async ({ id }) => {
    await deleteDBDoc("categories", id, categories, setCategories);
  };

  useEffect(() => {
    const getCategories = async () => {
      const items = await getDBDocs("categories");
      setCategories(items);
    };
    getCategories();
  }, []);

  return (
    <CoreLayout>
      <div className="wrapper">
        <div className="flex justify-between">
          <h1 className="text-lg">Categories</h1>
          <button
            type="button"
            className="py-2 px-3 inline-flex justify-center items-center gap-2 border border-transparent font-semibold bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-300 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 rounded-md"
            data-hs-overlay="#hs-focus-management-modal"
            onClick={() => setModalState(false)}
          >
            Add category
          </button>
          <AddCategoryModal
            setCategories={setCategories}
            categories={categories}
          />
          <EditCategoryModal
            setCategories={setCategories}
            categories={categories}
            oldCategory={oldCategory}
          />
        </div>
        <div className="flex flex-col mt-5">
          <div className="overflow-x-auto">
            <div className="p-0 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col">Category Name</th>
                      <th scope="col">Created date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {categories.map((cat) => (
                      <tr
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        key={cat.id}
                      >
                        <td>{cat.name}</td>
                        <td>
                          {cat.tempDate ||
                            cat.timestamp.toDate().getDate() +
                              " " +
                              months[cat.timestamp.toDate().getMonth()] +
                              " " +
                              cat.timestamp.toDate().getFullYear()}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-8 w-8 rounded-full border border-transparent font-semibold bg-blue-400 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all text-sm  dark:focus:ring-offset-gray-800"
                            data-hs-overlay="#hs-edit-category-modal"
                            onClick={() => {
                              setModalState(false);
                              setOldCategory(cat);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-5 h-5 fill-white"
                            >
                              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                            </svg>
                          </button>
                          <MyDeleteIconButton
                            onClick={handleDelete}
                            item={cat}
                          />
                        </td>
                      </tr>
                    ))}
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
