import EditPage from "@/components/editPage";

export default function EditSalaPage() {
  return (
    <EditPage
      backUrl={"/sala/kila-siku"}
      collectionName={"salazakilasiku"}
      isSala={true}
    />
  );
}
