import { renderHook, act } from "@testing-library/react";
import useToggle from "../src/hooks/useToggle";
import { describe, it, expect } from "vitest";

describe("useToggle", () => {
  it("respects initial value", () => {
    const { result: falseResult } = renderHook(() => useToggle(false));
    expect(falseResult.current.value).toBe(false);

    const { result: trueResult } = renderHook(() => useToggle(true));
    expect(trueResult.current.value).toBe(true);

    const { result: defaultResult } = renderHook(() => useToggle());
    expect(defaultResult.current.value).toBe(false);
  });

  it("toggle switches state", () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current.value).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(false);
  });
});
