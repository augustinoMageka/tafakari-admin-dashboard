import CreatePage from "@/components/createPage";

const backUrl = "/tafakari-nasi/sala-ya-waumini";
const title = "Ongeza Sala";
const collectionName = "salayawaumini";

export default function Page() {
  return (
    <CreatePage
      backUrl={backUrl}
      title={title}
      collectionName={collectionName}
    />
  );
}
