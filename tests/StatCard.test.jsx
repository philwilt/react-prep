import { render, screen } from "@testing-library/react";
import StatCard from "../src/components/StatCard";
import { describe, it, expect } from "vitest";

describe("StatCard", () => {
  it("renders all props correctly", () => {
    render(<StatCard label="Users" value="1,234" hint="Active this month" />);

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();
    expect(screen.getByText("Active this month")).toBeInTheDocument();
  });

  it("renders without hint prop", () => {
    render(<StatCard label="Revenue" value="$99.99" />);

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });
});
