import CreatePage from "@/components/createPage";

export default function Page() {
  return (
    <CreatePage
      backUrl={"/sala/novena"}
      collectionName={"novena"}
      title={"Novena"}
      isSala={true}
    />
  );
}
