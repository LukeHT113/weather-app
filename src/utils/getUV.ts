const uvDescriptions = [
  {
    category: "No significant",
    abbreviation: "-",
    colour: "#606060",
    textColour: '#fff'
  },
  {
    category: "Low",
    abbreviation: "L",
    colour: "#71b466",
    textColour: '#000'
  },
  {
    category: "Moderate",
    abbreviation: "M",
    colour: "#f8e71c",
    textColour: '#000'
  },
  {
    category: "High",
    abbreviation: "H",
    colour: "#ff950c",
    textColour: '#000'
  },
  {
    category: "Very High",
    abbreviation: "VH",
    colour: "#d72921",
    textColour: '#fff'
  },
  {
    category: "Extreme",
    abbreviation: "Ex",
    colour: "#6600e0",
    textColour: '#fff'
  },
]

function determineUv(uvIndex: number) {
  if (uvIndex < 1) {
    return uvDescriptions[0];
  }
  if (uvIndex < 3) {
    return uvDescriptions[1];
  }
  if (uvIndex < 6) {
    return uvDescriptions[2];
  }
  if (uvIndex < 8) {
    return uvDescriptions[3];
  }
  if (uvIndex < 11) {
    return uvDescriptions[4];
  } else {
    return uvDescriptions[5];
  }
}

export default determineUv;