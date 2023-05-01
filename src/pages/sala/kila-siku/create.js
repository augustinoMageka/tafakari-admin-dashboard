import CreatePage from "@/components/createPage";

export default function Page() {
  return (
    <CreatePage
      backUrl={"/sala/kila-siku"}
      collectionName={"salazakilasiku"}
      title={"Sala za kila siku"}
      isSala={true}
    />
  );
}
