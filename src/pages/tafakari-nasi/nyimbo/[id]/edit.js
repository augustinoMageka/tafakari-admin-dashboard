import EditPage from "@/components/editPage";

export default function Page() {
  const backUrl = "/tafakari-nasi/nyimbo";
  const collectionName = "nyimbo";

  return <EditPage backUrl={backUrl} collectionName={collectionName} />;
}
