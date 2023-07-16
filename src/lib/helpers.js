const removeLeadingZero = (v) => (v.startsWith("0") ? v.substring(1) : v);
const removeWhitespace = (v) =>
  v
    .split(" ")
    .filter((val) => val !== "")
    .join("");
const formatTelephone = (countryCode, phone) => {
  return countryCode + removeLeadingZero(removeWhitespace(phone));
};

export { formatTelephone };
