import CreatePage from "@/components/createPage";

export default function Page() {
  return (
    <CreatePage
      backUrl={"/sala/kawaida"}
      collectionName={"salazakawaida"}
      title={"Sala za kawaida"}
      isSala={true}
    />
  );
}
