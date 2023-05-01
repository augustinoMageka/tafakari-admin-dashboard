import EditPage from "@/components/editPage";

export default function Page() {
  const backUrl = "/tafakari-nasi/sala-ya-waumini";
  const collectionName = "salayawaumini";

  return <EditPage backUrl={backUrl} collectionName={collectionName} />;
}
