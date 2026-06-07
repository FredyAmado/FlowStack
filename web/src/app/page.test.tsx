import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import LandingPage from "./page";

// Mock next/navigation since some components may use it
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Landing Page", () => {
  it("renders the FlowStack branding text", () => {
    render(<LandingPage />);
    // The logo image has alt="FlowStack" and there are multiple
    // occurrences of the brand name in the page
    const flowstackElements = screen.getAllByText(/FlowStack/i);
    expect(flowstackElements.length).toBeGreaterThan(0);
  });

  it("renders the hero heading", () => {
    render(<LandingPage />);
    expect(screen.getByText(/Automatiza lo tedioso/i)).toBeInTheDocument();
  });

  it("renders the navigation", () => {
    render(<LandingPage />);
    // Use getAllByText since nav links appear in both desktop and mobile menu
    const nosotrosLinks = screen.getAllByText("Nosotros");
    expect(nosotrosLinks.length).toBeGreaterThanOrEqual(1);
    expect(nosotrosLinks[0]).toBeInTheDocument();
    const serviciosLinks = screen.getAllByText("Servicios");
    expect(serviciosLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the contact form", () => {
    render(<LandingPage />);
    expect(screen.getByPlaceholderText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeInTheDocument();
  });
});
