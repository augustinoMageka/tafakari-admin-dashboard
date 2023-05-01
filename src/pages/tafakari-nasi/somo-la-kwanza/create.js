import CreatePage from "@/components/createPage";

const backUrl = "/tafakari-nasi/somo-la-kwanza";
const title = "Ongeza Somo";
const collectionName = "somolakwanza";

export default function AddSalaPage() {
  return (
    <CreatePage
      backUrl={backUrl}
      title={title}
      collectionName={collectionName}
    />
  );
}
