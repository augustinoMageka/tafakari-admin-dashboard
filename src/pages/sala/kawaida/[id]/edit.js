import EditPage from "@/components/editPage";

export default function EditSalaPage() {
  return (
    <EditPage
      backUrl={"/sala/kawaida"}
      collectionName={"salazakawaida"}
      isSala={true}
    />
  );
}
