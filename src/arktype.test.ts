import { type } from "arktype";
import assert from "node:assert";
import test from "node:test";

// Model a user with a firstName and birthday that is a LocalDate (2024-01-01)
const user = type({
  firstName: "string",
  // decode the string to a LocalDate
  birthday: ["string", "|>", (s) => new LocalDate(s)],
});

// Revert the user, go from POJO to JSON
const userToJson = type({
  firstName: "string",
  // encode the LocalDate to a string
  birthday: [
    { month: "number", year: "number", day: "number" },
    "|>",
    (date) => date.year + "-" + date.month + "-" + date.day,
  ],
});

export type User = typeof user.infer;

test.describe("ArkType", () => {
  test.test("takes JSON to POJO", () => {
    const { data } = user({
      firstName: "John",
      birthday: "2024-01-01",
    });
    assert.strictEqual(data!.birthday.month, 1);
    assert.strictEqual(data!.birthday.day, 1);
    assert.strictEqual(data!.birthday.year, 2024);
  });

  test.test("takes POJO to JSON", () => {
    const user: User = {
      firstName: "John",
      birthday: new LocalDate("2024-01-01"),
    };
    const { data: enc } = userToJson(user);
    assert.strictEqual(enc!.birthday, "2024-1-1");
  });
});

class LocalDate {
  month: number;
  year: number;
  day: number;

  constructor(date: string) {
    const [year, month, day] = date.split("-");
    this.year = parseInt(year);
    this.month = parseInt(month);
    this.day = parseInt(day);
  }
}
