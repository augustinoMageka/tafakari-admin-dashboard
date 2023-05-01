import CreatePage from "@/components/createPage";

const backUrl = "/tafakari-nasi/injili";
const title = "Ongeza Injili";
const collectionName = "injili";

export default function Page() {
  return (
    <CreatePage
      backUrl={backUrl}
      title={title}
      collectionName={collectionName}
    />
  );
}
