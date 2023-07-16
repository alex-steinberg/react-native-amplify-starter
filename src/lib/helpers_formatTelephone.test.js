import { formatTelephone } from "./helpers";

test("formats phone number correctly", () => {
  const countryCode = "+27";
  const phone = "013 555 7778";
  expect(formatTelephone(countryCode, phone)).toBe("+27135557778");
});
