import EditPage from "@/components/editPage";

export default function Page() {
  const backUrl = "/tafakari-nasi/somo-la-kwanza";
  const collectionName = "somolakwanza";

  return <EditPage backUrl={backUrl} collectionName={collectionName} />;
}
