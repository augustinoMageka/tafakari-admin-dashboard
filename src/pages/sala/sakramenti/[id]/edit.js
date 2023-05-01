import EditPage from "@/components/editPage";

export default function EditSalaPage() {
  return (
    <EditPage
      backUrl={"/sala/sakramenti"}
      collectionName={"sakramenti"}
      isSala={true}
    />
  );
}
