import { BaseDate } from "../../../src/index";

import { describe, expect, it } from "vite-plus/test";

describe("Base date spec", () => {
  it("should instantiate a BaseDate", () => {
    expect(new BaseDate(0).getJdn()).toBe(0);
  });
});
