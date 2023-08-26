import { getAvailableSubtypes } from "./generateSubtypes";

interface DynamicFormField {
  label: string;
  type: "text" | "selection";
  options?: string[];
}

export const generateFieldsForCategory = (
  category: string,
  subtype: string | null
): DynamicFormField[] => {
  // Customize this function to return available fields based on the selected category and subtype
  const availableSubtypes = getAvailableSubtypes(category);

  if (availableSubtypes.includes(subtype || '')) { 
    if (subtype === 'table gas cookers') {
      return [
        { label: "Gas Burners", type: "selection", options: ["Nil", "1", "2", "3", "4", "5",] },
        { label: "Auto Ignition", type: "selection", options: ["Yes", "No"] },
        { label: "Warranty", type: "selection", options: ["1 year", "2 years", "3 years", "5 years", "10 years"] },
        { label: "color", type: "selection", options: ["black", "white", "silver", "red", "blue", "brown", "orange", "gold", "grey", "other"] },
      ];
    } else if (subtype === 'standing gas cookers') {
      return [
        {
          label: "Gas Burners",
          type: "selection",
          options: ["Nil", "1", "2", "3", "4", "5"],
        },
        {
          label: "Electric Burners",
          type: "selection",
          options: ["Nil", "1", "2", "3", "4", "5"],
        },
        { label: "Oven", type: "selection", options: ["Yes", "No"] },
        { label: "Grill", type: "selection", options: ["Yes", "No"] },
        { label: "Auto Ignition", type: "selection", options: ["Yes", "No"] },
        {
          label: "Warranty",
          type: "selection",
          options: ["1 year", "2 years", "3 years", "5 years", "10 years"],
        },
        {
          label: "Dimensions",
          type: "selection",
          options: ["60cmx60cm", "5cmx50cm", "60cmx90cm"],
        },
        {
          label: "Weight",
          type: "selection",
          options: [
            "10kg",
            "15kg",
            "20kg",
            "25kg",
            "30kg",
            "35kg",
            "40kg",
            "45kg",
            "50kg",
            "55kg",
            "60kg",
            "65kg",
            "70kg",
            "75kg",
            "80kg",
            "85kg",
            "90kg",
            "95kg",
            "100kg",
          ],
        },
        {
          label: "color",
          type: "selection",
          options: [
            "black",
            "white",
            "silver",
            "red",
            "blue",
            "brown",
            "orange",
            "gold",
            "grey",
            "other",
          ],
        },
      ];
    } else if (subtype === 'single door') {
      return [
        {
          label: "Capacity",
          type: "selection",
          options: [
            "50L",
            "93L",
            "94L",
            "100L",
            "200L",
            "250L",
            "300L",
            "400L",
            "500L",
            "600L",
            "700L",
            "800L",
          ],
        },
        { label: "Energy Rating", type: "text" },
        {
          label: "Weight",
          type: "selection",
          options: [
            "10kg",
            "15kg",
            "20kg",
            "25kg",
            "30kg",
            "35kg",
            "40kg",
            "45kg",
            "50kg",
            "55kg",
            "60kg",
            "65kg",
            "70kg",
            "75kg",
            "80kg",
            "85kg",
            "90kg",
            "95kg",
            "100kg",
          ],
        },
        {
          label: "Warranty",
          type: "selection",
          options: ["1 year", "2 years", "3 years", "5 years", "10 years"],
        },
        { label: "Glass Shelf", type: "selection", options: ["Yes", "No"] },
        { label: "Inverter", type: "selection", options: ["Yes", "No"] },
        { label: "Water Dispenser", type: "selection", options: ["Yes", "No"] },
        { label: "color", type: "selection", options: ["black", "white", "silver", "red", "blue", "brown", "orange", "gold", "grey", "other"] },
        { label: "Weight", type: "selection", options: ["10kg", "15kg", "20kg", "25kg", "30kg", "35kg", "40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg", "75kg", "80kg", "85kg", "90kg", "95kg", "100kg",] },
        { label: "color", type: "selection", options: ["black", "white", "silver", "red", "blue", "brown", "orange", "gold", "grey", "other"] },
      ]
    } else if (subtype === 'double door') {
      return [
        {
          label: "Capacity",
          type: "selection",
          options: [
            "94L",
            "100L",
            "200L",
            "250L",
            "300L",
            "400L",
            "500L",
            "600L",
            "700L",
            "800L",
          ],
        },
        { label: "Energy Rating", type: "text" },
        {
          label: "Weight",
          type: "selection",
          options: [
            "10kg",
            "15kg",
            "20kg",
            "25kg",
            "30kg",
            "35kg",
            "40kg",
            "45kg",
            "50kg",
            "55kg",
            "60kg",
            "65kg",
            "70kg",
            "75kg",
            "80kg",
            "85kg",
            "90kg",
            "95kg",
            "100kg",
          ],
        },
        {
          label: "Warranty",
          type: "selection",
          options: ["1 year", "2 years", "3 years", "5 years", "10 years"],
        },
        { label: "Glass Shelf", type: "selection", options: ["Yes", "No"] },
        { label: "Ice Maker", type: "selection", options: ["Yes", "No"] },
        { label: "Inverter", type: "selection", options: ["Yes", "No"] },
        { label: "Water Dispenser", type: "selection", options: ["Yes", "No"] },
        {
          label: "color",
          type: "selection",
          options: [
            "black",
            "white",
            "silver",
            "red",
            "blue",
            "brown",
            "orange",
            "gold",
            "grey",
            "other",
          ],
        },
        {
          label: "Weight",
          type: "selection",
          options: [
            "10kg",
            "15kg",
            "20kg",
            "25kg",
            "30kg",
            "35kg",
            "40kg",
            "45kg",
            "50kg",
            "55kg",
            "60kg",
            "65kg",
            "70kg",
            "75kg",
            "80kg",
            "85kg",
            "90kg",
            "95kg",
            "100kg",
          ],
        },
        {
          label: "color",
          type: "selection",
          options: [
            "black",
            "white",
            "silver",
            "red",
            "blue",
            "brown",
            "orange",
            "gold",
            "grey",
            "other",
          ],
        },
      ];
    } else if (subtype === 'side by side') {
      return [
        {
          label: "Capacity",
          type: "selection",
          options: [
            "94L",
            "100L",
            "200L",
            "250L",
            "300L",
            "400L",
            "500L",
            "600L",
            "700L",
            "800L",
          ],
        },
        { label: "Energy Rating", type: "text" },
        {
          label: "Weight",
          type: "selection",
          options: [
            "10kg",
            "15kg",
            "20kg",
            "25kg",
            "30kg",
            "35kg",
            "40kg",
            "45kg",
            "50kg",
            "55kg",
            "60kg",
            "65kg",
            "70kg",
            "75kg",
            "80kg",
            "85kg",
            "90kg",
            "95kg",
            "100kg",
          ],
        },
        {
          label: "Warranty",
          type: "selection",
          options: ["1 year", "2 years", "3 years", "5 years", "10 years"],
        },
        { label: "Glass Shelf", type: "selection", options: ["Yes", "No"] },
        { label: "Ice Maker", type: "selection", options: ["Yes", "No"] },
        { label: "Inverter", type: "selection", options: ["Yes", "No"] },
        { label: "Water Dispenser", type: "selection", options: ["Yes", "No"] },
        {
          label: "color",
          type: "selection",
          options: [
            "black",
            "white",
            "silver",
            "red",
            "blue",
            "brown",
            "orange",
            "gold",
            "grey",
            "other",
          ],
        },
        { label: "Ice Maker", type: "selection", options: ["Yes", "No"] },
        {
          label: "Weight",
          type: "selection",
          options: [
            "10kg",
            "15kg",
            "20kg",
            "25kg",
            "30kg",
            "35kg",
            "40kg",
            "45kg",
            "50kg",
            "55kg",
            "60kg",
            "65kg",
            "70kg",
            "75kg",
            "80kg",
            "85kg",
            "90kg",
            "95kg",
            "100kg",
          ],
        },
        {
          label: "color",
          type: "selection",
          options: [
            "black",
            "white",
            "silver",
            "red",
            "blue",
            "brown",
            "orange",
            "gold",
            "grey",
            "other",
          ],
        },
      ];
    } else if (subtype === 'chest freezers') {
      return [
        { label: "Capacity", type: "selection", options: ["100L", "200L", "300L", "400L", "500L", "600L", "700L", "800L",] },
        { label: "Energy Rating", type: "text" },
        { label: "Warranty", type: "selection", options: ["1 year", "2 years", "3 years", "5 years", "10 years"] },
        { label: "color", type: "selection", options: ["black", "white", "silver", "red", "blue", "brown", "orange", "gold", "grey", "other"] },
        { label: "Weight", type: "selection", options: ["10kg", "15kg", "20kg", "25kg", "30kg", "35kg", "40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg", "75kg", "80kg", "85kg", "90kg", "95kg", "100kg",] },
        { label: "Double Door", type: "selection", options: ["Yes", "No"] },
        { label: "Glass Shelf", type: "selection", options: ["Yes", "No"] },
        { label: "Inverter", type: "selection", options: ["Yes", "No"] },
      ]
    } else if (subtype === 'front load') {
      return [
        { label: "Capacity", type: "selection", options: ["5kg", "6kg", "7kg", "8kg", "9kg", "10kg", "11kg", "12kg",] },
        { label: "Energy Rating", type: "text" },
        { label: "Warranty", type: "selection", options: ["1 year", "2 years", "3 years", "5 years", "10 years"] },
        { label: "color", type: "selection", options: ["black", "white", "silver", "red", "blue", "brown", "orange", "gold", "grey", "other"] },
        { label: "Weight", type: "selection", options: ["10kg", "15kg", "20kg", "25kg", "30kg", "35kg", "40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg", "75kg", "80kg", "85kg", "90kg", "95kg", "100kg",] },
        { label: "washer type", type: "selection", options: ["Automatic"] },
        { label: "Dryer", type: "selection", options: ["Yes", "No"] },
        { label: "Inverter", type: "selection", options: ["Yes", "No"] },
      ]
    } else if (subtype === 'top load') {
      return [
        {
          label: "Capacity",
          type: "selection",
          options: ["5kg", "6kg", "7kg", "8kg", "9kg", "10kg", "11kg", "12kg", "15kg"],
        },
        { label: "Energy Rating", type: "text" },
        {
          label: "Warranty",
          type: "selection",
          options: ["1 year", "2 years", "3 years", "5 years", "10 years"],
        },
        {
          label: "color",
          type: "selection",
          options: [
            "black",
            "white",
            "silver",
            "red",
            "blue",
            "brown",
            "orange",
            "gold",
            "grey",
            "other",
          ],
        },
        {
          label: "Weight",
          type: "selection",
          options: [
            "10kg",
            "15kg",
            "20kg",
            "25kg",
            "30kg",
            "35kg",
            "40kg",
            "45kg",
            "50kg",
            "55kg",
            "60kg",
            "65kg",
            "70kg",
            "75kg",
            "80kg",
            "85kg",
            "90kg",
            "95kg",
            "100kg",
          ],
        },
        {
          label: "washer type",
          type: "selection",
          options: ["Automatic", "Semi Automatic", "Single semi auto"],
        },
        { label: "Dryer", type: "selection", options: ["Yes", "No"] },
        { label: "Inverter", type: "selection", options: ["Yes", "No"] },
      ];
    } else if (subtype === 'split unit') {
      return [
        { label: "Capacity", type: "selection", options: ["1hp", "1.5hp", "2hp", "2.5hp", "3hp", "4hp", "5hp", "6hp",] },
        { label: "Energy Rating", type: "text" },
        { label: "Warranty", type: "selection", options: ["1 year", "2 years", "3 years", "5 years", "10 years"] },
        { label: "color", type: "selection", options: ["black", "white", "silver", "red", "blue", "brown", "orange", "gold", "grey", "other"] },
        { label: "Weight", type: "selection", options: ["10kg", "15kg", "20kg", "25kg", "30kg", "35kg", "40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg",] },
        { label: "Inverter", type: "selection", options: ["Yes", "No"] },
      ]
    } else if (subtype === 'window unit') {
      return [
        { label: "Capacity", type: "selection", options: ["1hp", "1.5hp", "2hp", "2.5hp", "3hp", "4hp", "5hp", "6hp",] },
        { label: "Energy Rating", type: "text" },
        { label: "Warranty", type: "selection", options: ["1 year", "2 years", "3 years", "5 years", "10 years"] },
        { label: "color", type: "selection", options: ["black", "white", "silver", "red", "blue", "brown", "orange", "gold", "grey", "other"] },
        { label: "Weight", type: "selection", options: ["10kg", "15kg", "20kg", "25kg", "30kg", "35kg", "40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg",] },
      ]
    } else if (subtype === 'floor standing') { 
      return [
        { label: "Capacity", type: "selection", options: ["2hp", "2.5hp", "3hp", "4hp", "5hp", "6hp",] },
        { label: "Energy Rating", type: "text" },
        { label: "Warranty", type: "selection", options: ["1 year", "2 years", "3 years", "5 years", "10 years"] },
        { label: "color", type: "selection", options: ["black", "white", "silver", "red", "blue", "brown", "orange", "gold", "grey", "other"] },
        { label: "Weight", type: "selection", options: ["10kg", "15kg", "20kg", "25kg", "30kg", "35kg", "40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg",] },
      ]
    } else if (subtype === 'tv') {
      return [
        { label: "Screen Size", type: "selection", options: ["32 inches", "40 inches", "43 inches", "50 inches", "55 inches", "65 inches", "75 inches", "82 inches", "85 inches", "98 inches",] },
        { label: "Resolution", type: "selection", options: ["HD", "Full HD", "4K", "8K"] },
        { label: "Display technology",type: "selection", options: ["LED", "OLED", "QLED", "UHD", "Android", "ULED", "NANO"] },
        { label: "Smart TV", type: "selection", options: ["Yes", "No"] },
        { label: "Warranty", type: "selection", options: ["1 year", "2 years", "3 years", "5 years", "10 years"] },
        { label: "color", type: "selection", options: ["black", "white", "silver", "red", "blue", "brown", "orange", "gold", "grey", "other"] },
        { label: "Weight", type: "selection", options: ["10kg", "15kg", "20kg", "25kg", "30kg", "35kg", "40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg",] },
        {label: "HDMI", type: "selection", options: ["2", "3", "4", "6"] },
      ]
    } else if (subtype === 'petrol generators') {
      return [
        {
          label: "Power Output",
          type: "text",
        },
        {
          label: "Fuel Tank Capacity",
          type: "selection",
          options: ["7L", "15L", "25L", "30L"]
        },
        {
          label: "Warranty",
          type: "selection",
          options: ["3 months","1 year", "2 years"]
        },
        {
          label: "color",
          type: "selection",
          options: ["black", "white", "silver", "red", "blue", "brown", "orange", "gold", "grey", "other"]
        },
        {
          label: "Weight",
          type: "selection",
          options: ["10kg", "15kg", "20kg", "25kg", "30kg", "35kg", "40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg",]
        }, 
        {
          label: "Starting System",
          type: "selection",
          options: ["Manual", "Electric"]
        },
        {
          label: "Noise Level",
          type: "selection",
          options: ["50dB", "60dB", "70dB", "80dB", "90dB", "100dB", "110dB", "120dB", "130dB", "140dB", "150dB", "160dB", "170dB", "180dB", "190dB", "200dB",]
        },
        {
          label: "Remote Control",
          type: "selection",
          options: ["Yes", "No"]
        }
      ];
    }

  }
  return [];
};