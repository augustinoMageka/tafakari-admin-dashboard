import EditPage from "@/components/editPage";

export default function EditSalaPage() {
  return (
    <EditPage backUrl={"/sala/familia"} collectionName={"salazafamilia"} isSala={true} />
  );
}
