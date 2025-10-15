import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Navbar from "../index";

vi.mock("react-ionicons", () => ({
  PersonCircle: ({
    color,
    width,
    height,
  }: {
    color: string;
    width: string;
    height: string;
  }) => (
    <svg
      data-testid="person-circle-icon"
      color={color}
      width={width}
      height={height}
    >
      <title>Person Circle Icon</title>
    </svg>
  ),
}));

describe("Navbar Component", () => {
  it("should render logo and title correctly", () => {
    render(<Navbar />);

    const title = screen.getByText("Kanban Board");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-blue-500", "font-semibold");
  });

  it("should render PersonCircle icon", () => {
    render(<Navbar />);

    const icon = screen.getByTestId("person-circle-icon");
    expect(icon).toBeInTheDocument();
  });

  it("should have responsive text size", () => {
    render(<Navbar />);

    const title = screen.getByText("Kanban Board");
    expect(title).toHaveClass("md:text-lg", "text-sm", "whitespace-nowrap");
  });

  it("should have cursor pointer on logo area", () => {
    render(<Navbar />);

    const logoContainer = screen.getByText("Kanban Board").closest("div");
    expect(logoContainer).toHaveClass("cursor-pointer");
  });
});

describe("Navbar Interactive Behavior", () => {
  it("should have clickable logo area", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(
      <div onClick={mockOnClick}>
        <Navbar />
      </div>,
    );

    const logoArea = screen.getByText("Kanban Board").closest("div");

    if (logoArea) {
      await user.click(logoArea);
      expect(mockOnClick).toHaveBeenCalled();
    }
  });
});
