import EditPage from "@/components/editPage";

export default function Page() {
  const backUrl = "/tafakari-nasi/zaburi";
  const collectionName = "zaburi";

  return <EditPage backUrl={backUrl} collectionName={collectionName} />;
}
