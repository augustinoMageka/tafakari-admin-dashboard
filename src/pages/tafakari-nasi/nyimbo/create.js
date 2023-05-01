import CreatePage from "@/components/createPage";

const backUrl = "/tafakari-nasi/nyimbo";
const title = "Ongeza nyimbo";
const collectionName = "nyimbo";

export default function Page() {
  return (
    <CreatePage
      backUrl={backUrl}
      title={title}
      collectionName={collectionName}
    />
  );
}
