// Define an array of 20 muted, high-contrast colors using color theory
const colorArray: string[] = [
  "#767676",
  "#A7A7A7",
  "#DFDFDF",
  "#BDA0CB",
  "#D69E9E",
  "#F2B5D4",
  "#B8C9F1",
  "#8EAEBD",
  "#CCCCCC",
  "#FEC3A6",
  "#FFD1DC",
  "#BDD7EE",
  "#8FB08F",
  "#C9C9A7",
  "#FEE996",
  "#909967",
  "#FCD5CE",
  "#F9CB9C",
  "#C7B299",
  "#B4A7D6"
];


// Define a set to keep track of the colors that have already been returned
let usedColors = new Set<string>();

export function getRandomColor(): string {
  // Keep generating a random index in the color array until we find a color
  // that hasn't been used yet
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * colorArray.length);
  } while (usedColors.has(colorArray[newIndex]));

  // Once we've found a new color, add it to the set of used colors
  const newColor = colorArray[newIndex];
  usedColors.add(newColor);

  // If we've used all the colors, empty the set and start over
  if (usedColors.size === colorArray.length) {
    usedColors = new Set<string>();
  }

  // Return the new color
  return newColor;
}
