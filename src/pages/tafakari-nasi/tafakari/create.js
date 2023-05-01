import CreatePage from "@/components/createPage";

const backUrl = "/tafakari-nasi/tafakari";
const title = "Ongeza Tafakuri";
const collectionName = "tafakari";

export default function Page() {
  return (
    <CreatePage
      backUrl={backUrl}
      title={title}
      collectionName={collectionName}
    />
  );
}
