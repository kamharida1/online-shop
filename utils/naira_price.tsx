const formatPrice = (price: number) => {
  if (typeof price !== "number") {
    return "Invalid Price";
  }

  return price.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default formatPrice;