import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import AddModal from "../AddModal";

vi.mock("uuid", () => ({
  v4: vi.fn(() => "mock-uuid-123"),
}));

vi.mock("../../../helpers/getRandomColors", () => ({
  getRandomColors: vi.fn(() => ({
    bg: "#dbeafe",
    text: "#2563eb",
  })),
}));

describe("AddModal", () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    setOpen: vi.fn(),
    handleAddTask: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should update form fields when typing", async () => {
    const user = userEvent.setup();
    render(<AddModal {...mockProps} />);

    const titleInput = screen.getByPlaceholderText("Título");
    const descriptionInput = screen.getByPlaceholderText("Descrição");
    const deadlineInput = screen.getByPlaceholderText("Prazo (em dias)");

    await user.type(titleInput, "New Task");
    await user.type(descriptionInput, "New Description");
    await user.type(deadlineInput, "5");

    expect(titleInput).toHaveValue("New Task");
    expect(descriptionInput).toHaveValue("New Description");
    expect(deadlineInput).toHaveValue(5);
  });

  it("should not add empty tag", async () => {
    const user = userEvent.setup();
    render(<AddModal {...mockProps} />);

    const addTagButton = screen.getByText("Adicionar Etiqueta");
    await user.click(addTagButton);

    expect(screen.queryByText("Etiquetas:")).not.toBeInTheDocument();
  });

  it("should handle priority selection", async () => {
    const user = userEvent.setup();
    render(<AddModal {...mockProps} />);

    const prioritySelect = screen.getByDisplayValue("Prioridade");
    await user.selectOptions(prioritySelect, "high");

    expect(prioritySelect).toHaveValue("high");
  });

  it("should handle alt text input", async () => {
    const user = userEvent.setup();
    render(<AddModal {...mockProps} />);

    const altInput = screen.getByPlaceholderText("Texto alternativo da imagem");
    await user.type(altInput, "Test alt text");

    expect(altInput).toHaveValue("Test alt text");
  });
});
