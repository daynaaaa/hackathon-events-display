// Turn string in snake case (e.g. snake_case) and 
// transforms into title case (e.g. Title Case)
export const toTitleCase = (str: string) => {
  return str
    .replace("_", " ")
    .replace("_", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
