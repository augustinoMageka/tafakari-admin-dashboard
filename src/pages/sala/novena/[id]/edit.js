import EditPage from "@/components/editPage";

export default function EditSalaPage() {
  return (
    <EditPage
      backUrl={"/sala/novena"}
      collectionName={"novena"}
      isSala={true}
    />
  );
}
