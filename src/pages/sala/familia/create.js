import CreatePage from "@/components/createPage";

export default function Page() {
  return (
    <CreatePage
      backUrl={"/sala/familia"}
      collectionName={"salazafamilia"}
      title={"Sala za familia"}
      isSala={true}
    />
  );
}
