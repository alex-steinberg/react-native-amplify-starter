const requiredField = (v) => {
  if (v) {
    return v.replace(/\s+/g, " ").trim().length > 0 || "This field is required";
  }
  return "This field is required";
};
const isNumber = (v) =>
  (!isNaN(parseFloat(v)) && isFinite(v)) || "Enter a number";

const validateEmail = (email) => {
  const re = /^\S+@\S+\.\S+$/;
  return (
    re.test(String(email).toLowerCase()) || "Must be a valid email address"
  );
};

const validatePassword = (v) => {
  const rules = [
    (val) => (val && val.length > 0) || "Enter your password",
    (val) => val.length >= 8 || "Password must be at least 8 characters long",
    (val) =>
      Array.from(val).filter((char) => {
        return /[A-Z]|[\u0080-\u024F]/.test(char);
      }).length > 0 || "Password must contain a capital letter",
    (val) =>
      Array.from(val).filter((char) => {
        return /[a-z]|[\u0080-\u024F]/.test(char);
      }).length > 0 || "Password must contain a lowercase letter",
    (val) =>
      Array.from(val).filter((char) => !isNaN(char)).length > 0 ||
      "Password must contain a number",
    (val) =>
      Array.from(val).filter((char) => {
        return /(?=.*?[#?!@$%_^&*-])/.test(char);
      }).length > 0 || "Password must contain a special character",
  ];
  const result = rules.reduce((accumulator, rule) => {
    const result = rule(v);
    return accumulator + (result !== true ? result + "\n" : "");
  }, "");

  return result === "" ? true : result; // returns `true` if valid, otherwise a list of validation messages
};

const startsWithPlus = (phone) =>
  phone?.startsWith("+") || "Include the country code, e.g. +181377700000";

export {
  requiredField,
  isNumber,
  validateEmail,
  startsWithPlus,
  validatePassword,
};
