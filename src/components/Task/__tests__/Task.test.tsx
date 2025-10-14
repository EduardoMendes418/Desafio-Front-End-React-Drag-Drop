import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { TaskT } from "../../../types";
import Task from "..";

vi.mock("react-ionicons", () => ({
  TimeOutline: ({
    color,
    width,
    height,
  }: {
    color: string;
    width: string;
    height: string;
  }) => (
    <svg
      data-testid="time-outline-icon"
      color={color}
      width={width}
      height={height}
    >
      <title>Time Outline Icon</title>
    </svg>
  ),
  TrashOutline: ({
    color,
    width,
    height,
  }: {
    color: string;
    width: string;
    height: string;
  }) => (
    <svg
      data-testid="trash-outline-icon"
      color={color}
      width={width}
      height={height}
    >
      <title>Trash Outline Icon</title>
    </svg>
  ),
}));

const mockTask: TaskT = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  priority: "medium",
  deadline: 30,
  tags: [{ title: "Frontend", bg: "#dbeafe", text: "#2563eb" }],
};

const mockProvided = {
  innerRef: vi.fn(),
  draggableProps: {
    style: {},
  },
  dragHandleProps: {},
};

describe("Task Component", () => {
  it("should render task information correctly", () => {
    render(<Task task={mockTask} provided={mockProvided} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("30 min")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("should show delete button on hover", () => {
    const mockOnDelete = vi.fn();
    render(
      <Task task={mockTask} provided={mockProvided} onDelete={mockOnDelete} />
    );

    const taskElement = screen.getByText("Test Task").closest("div");
    fireEvent.mouseEnter(taskElement!);

    const deleteButton = screen.getByTitle("Excluir tarefa");
    expect(deleteButton).toBeInTheDocument();
  });

  it("should call onDelete when delete button is clicked", () => {
    const mockOnDelete = vi.fn();

    const confirmMock = vi.spyOn(window, "confirm");
    confirmMock.mockImplementation(() => true);

    render(
      <Task task={mockTask} provided={mockProvided} onDelete={mockOnDelete} />
    );

    const taskElement = screen.getByText("Test Task").closest("div");
    fireEvent.mouseEnter(taskElement!);

    const deleteButton = screen.getByTitle("Excluir tarefa");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("1", "Test Task");

    confirmMock.mockRestore();
  });

  it("should not call onDelete when confirmation is canceled", () => {
    const mockOnDelete = vi.fn();

    const confirmMock = vi.spyOn(window, "confirm");
    confirmMock.mockImplementation(() => false);

    render(
      <Task task={mockTask} provided={mockProvided} onDelete={mockOnDelete} />
    );

    const taskElement = screen.getByText("Test Task").closest("div");
    fireEvent.mouseEnter(taskElement!);

    const deleteButton = screen.getByTitle("Excluir tarefa");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).not.toHaveBeenCalled();

    confirmMock.mockRestore();
  });

  it("should render priority indicator correctly for medium priority", () => {
    render(<Task task={mockTask} provided={mockProvided} />);

    const priorityIndicator = screen.getByText("Média");
    expect(priorityIndicator).toBeInTheDocument();
  });

  it("should render priority indicator correctly for high priority", () => {
    const highPriorityTask: TaskT = {
      ...mockTask,
      priority: "high",
    };

    render(<Task task={highPriorityTask} provided={mockProvided} />);

    const priorityIndicator = screen.getByText("Alta");
    expect(priorityIndicator).toBeInTheDocument();
  });

  it("should render priority indicator correctly for low priority", () => {
    const lowPriorityTask: TaskT = {
      ...mockTask,
      priority: "low",
    };

    render(<Task task={lowPriorityTask} provided={mockProvided} />);

    const priorityIndicator = screen.getByText("Baixa");
    expect(priorityIndicator).toBeInTheDocument();
  });

  it("should render TimeOutline icon", () => {
    render(<Task task={mockTask} provided={mockProvided} />);

    const timeIcon = screen.getByTestId("time-outline-icon");
    expect(timeIcon).toBeInTheDocument();
  });

  it("should render multiple tags correctly", () => {
    const taskWithMultipleTags: TaskT = {
      ...mockTask,
      tags: [
        { title: "Frontend", bg: "#dbeafe", text: "#2563eb" },
        { title: "Urgent", bg: "#fee2e2", text: "#dc2626" },
      ],
    };

    render(<Task task={taskWithMultipleTags} provided={mockProvided} />);

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Urgent")).toBeInTheDocument();
  });

  it("should apply correct styles to tags", () => {
    render(<Task task={mockTask} provided={mockProvided} />);

    const tag = screen.getByText("Frontend");
    expect(tag).toHaveStyle({
      backgroundColor: "#dbeafe",
      color: "#2563eb",
    });
  });
});
