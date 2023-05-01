import CreatePage from "@/components/createPage";

const backUrl = "/tafakari-nasi/nukuu";
const title = "Ongeza Nukuu";
const collectionName = "nukuu";

export default function Page() {
  return (
    <CreatePage
      backUrl={backUrl}
      title={title}
      collectionName={collectionName}
    />
  );
}
