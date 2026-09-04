const { test } = require("node:test");
const assert = require("node:assert/strict");
const { parse, age } = require("../app/static/birth-date.js");

const latest = "2026-09-04";
test("accepts a manually entered 1976 birth date and keeps ISO storage", () => {
  assert.deepEqual(parse({ day: "15", month: "1", year: "1976" }, latest), { value: "1976-01-15", error: "" });
});
test("allows an omitted optional birth date", () => {
  assert.deepEqual(parse({}, latest), { value: "", error: "" });
});
test("does not silently convert incomplete or year 0076 input", () => {
  for (const year of ["76", "0076", "197", "", "abcd"]) {
    assert.notEqual(parse({ day: "15", month: "1", year }, latest).error, "");
  }
});
test("validates calendar dates, including leap years", () => {
  assert.equal(parse({ day: "29", month: "2", year: "1976" }, latest).value, "1976-02-29");
  for (const parts of [{ day: "29", month: "2", year: "1977" }, { day: "31", month: "4", year: "1976" }, { day: "0", month: "1", year: "1976" }, { day: "1", month: "13", year: "1976" }]) {
    assert.notEqual(parse(parts, latest).error, "");
  }
});
test("rejects future dates", () => {
  assert.notEqual(parse({ day: "5", month: "9", year: "2026" }, latest).error, "");
});
test("calculates age on either side of the birthday", () => {
  assert.equal(age("1976-01-15", "2026-09-04"), 50);
  assert.equal(age("1976-09-05", "2026-09-04"), 49);
  assert.equal(age("1976-09-04", "2026-09-04"), 50);
  assert.equal(age("", latest), "");
});
