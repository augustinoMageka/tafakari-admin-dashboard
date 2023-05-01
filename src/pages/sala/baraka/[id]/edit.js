import EditPage from "@/components/editPage";

export default function EditSalaPage() {
  return (
    <EditPage
      backUrl={"/sala/baraka"}
      collectionName={"baraka"}
      isSala={true}
    />
  );
}
