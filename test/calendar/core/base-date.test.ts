import { BaseDate } from "../../../src/index";

import { describe, expect, it } from "vite-plus/test";

describe("Base date spec", () => {
  it("should instantiate a BaseDate", () => {
    const cal: BaseDate = new BaseDate(0);

    expect(cal.getJdn()).toBe(0);
  });
});
