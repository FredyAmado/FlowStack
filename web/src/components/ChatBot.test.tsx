import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@/test/utils";
import ChatBot from "./ChatBot";

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  mockFetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ reply: "¡Hola! ¿En qué puedo ayudarte?" }),
  });
});

describe("ChatBot", () => {
  it("renders a floating button by default", () => {
    render(<ChatBot />);
    const buttons = screen.getAllByRole("button");
    // Should have at least the main toggle button
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("opens the chat window when the button is clicked", async () => {
    render(<ChatBot />);
    const buttons = screen.getAllByRole("button");
    // First button is the toggle
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(screen.getByText(/asistente de FlowStack/i)).toBeInTheDocument();
    });
  });

  it("can be closed after opening", async () => {
    render(<ChatBot />);
    // Open
    const toggleBtn = screen.getAllByRole("button")[0];
    fireEvent.click(toggleBtn);

    await waitFor(() => {
      expect(screen.getByText(/asistente de FlowStack/i)).toBeInTheDocument();
    });

    // When chat is open, there should be a close button (the X button in the header)
    // The close button is the one inside the orange header, not the send button
    const allButtons = screen.getAllByRole("button");
    // After opening, we have: toggle (hidden behind closed state), close X, and send button
    // Actually when open, the toggle is replaced by the chat window
    // The first button in the chat window is the close X
    const closeBtn = allButtons.find((btn) =>
      btn.innerHTML.includes("lucide-x")
    );
    expect(closeBtn).toBeTruthy();
    if (closeBtn) {
      fireEvent.click(closeBtn);
      await waitFor(() => {
        expect(screen.queryByText(/asistente de FlowStack/i)).not.toBeInTheDocument();
      });
    }
  });

  it("shows only the toggle button when closed", () => {
    render(<ChatBot />);
    // The chatbot greeting should NOT be visible when closed
    expect(screen.queryByText(/asistente de FlowStack/i)).not.toBeInTheDocument();
  });
});
