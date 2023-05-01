import EditPage from "@/components/editPage";

export default function Page() {
  const backUrl = "/tafakari-nasi/nukuu";
  const collectionName = "nukuu";

  return <EditPage backUrl={backUrl} collectionName={collectionName} />;
}
