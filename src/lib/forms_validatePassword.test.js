import { validatePassword } from "./forms";

test("123 to be invalid: no special character, uppercase and lowercase letter, not long enough", () => {
  const password = "123";
  const validate = validatePassword(password);
  expect(typeof validate).toBe("string");
  expect(validate).toContain("Password must be at least 8 characters long");
  expect(validate).toContain("Password must contain a capital letter");
  expect(validate).toContain("Password must contain a lowercase letter");
  expect(validate).toContain("Password must be at least 8 characters long");
  expect(validate).toContain("Password must contain a special character");
});

test("validate password passes", () => {
  const validPassword = "bJ8&sdssa";
  expect(typeof validatePassword(validPassword)).toBe("boolean");
  expect(validatePassword(validPassword)).toBe(true);
});
