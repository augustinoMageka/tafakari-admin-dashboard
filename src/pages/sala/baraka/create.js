import CreatePage from "@/components/createPage";

export default function Page() {
  return (
    <CreatePage
      backUrl={"/sala/baraka"}
      collectionName={"baraka"}
      title={"Sala za baraka"}
      isSala={true}
    />
  );
}
