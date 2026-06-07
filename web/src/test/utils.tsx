import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

type AllTheProvidersProps = {
  children: React.ReactNode;
};

function AllTheProviders({ children }: AllTheProvidersProps) {
  return <SessionProvider session={null}>{children}</SessionProvider>;
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
