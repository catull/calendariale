import { YearDate } from "../../../src/index";

import { describe, expect, it } from "vite-plus/test";

describe("Year date spec", () => {
  it("should determine a year of an instance of YearDate", () => {
    expect(new YearDate(-1, 2000).getYear()).toBe(2000);

    expect(new YearDate(-1, 1900).getYear()).toBe(1900);
  });
});
