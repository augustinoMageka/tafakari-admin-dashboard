import CreatePage from "@/components/createPage";

const backUrl = "/tafakari-nasi/zaburi";
const title = "Ongeza Zaburi";
const collectionName = "zaburi";

export default function Page() {
  return (
    <CreatePage
      backUrl={backUrl}
      title={title}
      collectionName={collectionName}
    />
  );
}
