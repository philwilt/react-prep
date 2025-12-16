import { renderHook, act } from "@testing-library/react";
import useClock from "../src/hooks/useClock";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("useClock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns formatted time string matching HH:MM:SS pattern", () => {
    vi.setSystemTime(new Date("2024-01-15T14:30:45"));

    const { result } = renderHook(() => useClock());

    expect(result.current).toBe("14:30:45");
    expect(result.current).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it("clears interval on unmount", () => {
    const clearIntervalSpy = vi.spyOn(global, "clearInterval");

    const { unmount } = renderHook(() => useClock());

    expect(clearIntervalSpy).not.toHaveBeenCalled();

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    clearIntervalSpy.mockRestore();
  });
});
