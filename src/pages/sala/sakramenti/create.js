import CreatePage from "@/components/createPage";

export default function Page() {
  return (
    <CreatePage
      backUrl={"/sala/sakramenti"}
      collectionName={"sakramenti"}
      title={"Sakramenti"}
      isSala={true}
    />
  );
}
