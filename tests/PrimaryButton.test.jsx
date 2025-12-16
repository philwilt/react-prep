import { render, screen, fireEvent } from "@testing-library/react";
import PrimaryButton from "../src/components/PrimaryButton";
import { describe, it, expect, vi } from "vitest";

describe("PrimaryButton", () => {
  it("renders with label", () => {
    render(<PrimaryButton label="Click me" />);

    expect(screen.getByText("Click me")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("fires onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<PrimaryButton label="Submit" onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies ghost class when tone is ghost", () => {
    render(<PrimaryButton label="Ghost Button" tone="ghost" />);

    const button = screen.getByRole("button");
    expect(button.className).toMatch(/ghost/);
  });
});
