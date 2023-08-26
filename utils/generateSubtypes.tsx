export const getAvailableSubtypes = (category: string): string[] => {
  // Customize this function to return available subtypes based on the selected category
  if (category === "Gas Cookers") {
    return ["table gas cookers", "standing gas cookers"];
  } else if (category === "Fridges") {
    return ["single door", "double door", "side by side"];
  } else if (category === "Freezers") {
    return ["chest freezers", "upright freezers"];
  } else if (category === "Washing Machines") {
    return ["front load", "top load"];
  } else if (category === "Air Conditioners") {
    return ["split ac", "window ac", "floor standing ac"];
  } else if (category === "Televisions") {
    return ["tv", ];
  } else if (category === "Microwaves") {
    return ["solo microwave", "grill microwave", "convection microwave"];
  } else if (category === "Water Dispensers") {
    return ["table water dispensers", "standing water dispensers"];
  } else if (category === "Generators") {
    return ["petrol generators", "diesel generators"];
  }
  return [];
};
