import { render, screen, fireEvent } from "@testing-library/react";
import UserTable from "../src/pages/UserTablePage";
import { describe, it, expect } from "vitest";

describe("UserTablePage", () => {
  describe("Search", () => {
    it("filters results by name when typing in search", () => {
      render(<UserTable />);

      const searchInput = screen.getByLabelText(/search by name or email/i);
      fireEvent.change(searchInput, { target: { value: "Alice" } });

      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();
    });

    it("shows empty state when search has no matches", () => {
      render(<UserTable />);

      const searchInput = screen.getByLabelText(/search by name or email/i);
      fireEvent.change(searchInput, { target: { value: "zzzznonexistent" } });

      // With no results, there should be no user rows and page shows 0
      expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
      expect(screen.getByText(/page 0 of 0/i)).toBeInTheDocument();
    });
  });

  describe("Sort", () => {
    it("sorts data when clicking column header", () => {
      render(<UserTable />);

      // Initial sort is by name desc, so Jack Taylor should be first (alphabetically last)
      const rows = screen.getAllByRole("row");
      // First row is header, second row is first data row
      expect(rows[1]).toHaveTextContent("Jack Taylor");

      // Click name to toggle to ascending
      const nameHeader = screen.getByRole("button", { name: /name/i });
      fireEvent.click(nameHeader);

      // After clicking, should be ascending - Alice Johnson first
      const sortedRows = screen.getAllByRole("row");
      expect(sortedRows[1]).toHaveTextContent("Alice Johnson");
    });
  });

  describe("Pagination", () => {
    it("advances to page 2 when clicking Next", () => {
      render(<UserTable />);

      expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();

      const nextButton = screen.getByRole("button", { name: /next/i });
      fireEvent.click(nextButton);

      expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();
    });

    it("disables Previous button on page 1", () => {
      render(<UserTable />);

      const prevButton = screen.getByRole("button", { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });
  });

  describe("Render", () => {
    it("renders all 10 users across pages", () => {
      render(<UserTable />);

      // Page 1: should have 5 users visible
      expect(screen.getAllByRole("row")).toHaveLength(6); // 5 data rows + 1 header

      // Navigate to page 2
      const nextButton = screen.getByRole("button", { name: /next/i });
      fireEvent.click(nextButton);

      // Page 2: should have remaining 5 users
      expect(screen.getAllByRole("row")).toHaveLength(6); // 5 data rows + 1 header

      // Total pages should be 2 (10 users / 5 per page)
      expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();
    });
  });
});
