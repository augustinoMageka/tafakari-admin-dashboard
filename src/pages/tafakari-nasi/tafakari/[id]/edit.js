import EditPage from "@/components/editPage";

export default function Page() {
  const backUrl = "/tafakari-nasi/tafakari";
  const collectionName = "tafakari";

  return (
    <EditPage
      backUrl={backUrl}
      collectionName={collectionName}
      fields={fields}
    />
  );
}
