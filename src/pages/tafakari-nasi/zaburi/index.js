import ListingPage from "@/components/listingPage";

const collectionName = "zaburi";
const title = "Zaburi";
const backUrl = "/tafakari-nasi/zaburi/create";

export default function Page() {
  return <ListingPage collectionName={collectionName} title={title} />;
}
