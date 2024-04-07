import { type } from "arktype";
import assert from "node:assert";
import test from "node:test";

// Model a user with a firstName and birthday that is a LocalDate (2024-01-01)
export const user = type({
  firstName: "string",
  birthday: ["string", "|>", parseLocalDate],
});

export type User = typeof user.infer;

test.describe("ArkType", () => {
  test.test("takes JSON to POJO", () => {
    const { data, problems } = user({
      firstName: "John",
      birthday: "2024-01-01",
    });
    assert.strictEqual(data!.birthday.month, 1);
    assert.strictEqual(data!.birthday.day, 1);
    assert.strictEqual(data!.birthday.year, 2024);
  });
});

function parseLocalDate(date: string): LocalDate {
  return new LocalDate(date);
}

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
