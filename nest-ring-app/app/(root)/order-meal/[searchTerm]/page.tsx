import { fetchDeliveryFood } from "../lib/utils";

const SearchTerm = async ({
  params: { searchTerm },
}: Readonly<{ params: { searchTerm: string } }>) => {
  const foodObj = await fetchDeliveryFood(searchTerm);

  console.log(foodObj);
  return <div>{searchTerm}</div>;
};

export default SearchTerm;
