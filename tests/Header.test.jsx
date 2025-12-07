import { render, screen } from "@testing-library/react";
import Header from "../src/components/Header";
import { describe, it, expect } from "vitest";

describe("Header", () => {
  it("renders title, subtitle, and timestamp", () => {
    render(
      <Header
        title="Test Title"
        subtitle="Test Subtitle"
        timestamp="12:00 PM"
      />,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("12:00 PM")).toBeInTheDocument();
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();
  });
});
