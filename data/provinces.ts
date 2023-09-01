import ProvincesData from "./provinces-data";

const item = ProvincesData.map((province) => {
  return { label: province.name, value: province.name };
});
const Provinces = item;

export default Provinces;