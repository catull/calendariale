import { LeapDate } from "../../../src/index";

import { describe, expect, it } from "vite-plus/test";

describe("Leap date spec", () => {
  it("should determine a leap year of an instance of LeapDate", () => {
    expect(new LeapDate(-1, 2000, 1, 1, true).isYearLeap()).toBe(true);

    expect(new LeapDate(-1, 1900, 1, 1, false).isYearLeap()).toBe(false);
  });
});
