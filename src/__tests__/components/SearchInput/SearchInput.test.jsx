import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("SearchInput Component", () => {
  const mockReplace = jest.fn();
  const mockUseSearchParams = new URLSearchParams();

  beforeEach(() => {
    useRouter.mockReturnValue({ replace: mockReplace });
    usePathname.mockReturnValue("/dashboard");
    useSearchParams.mockReturnValue(mockUseSearchParams);
    mockReplace.mockClear();
  });

  it("should render the search input and button correctly", () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should update the search value on input change", () => {
    render(<SearchInput />);
    const inputElement = screen.getByPlaceholderText("Search...");

    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement).toHaveValue("test");
  });

  it("should submit the form with a search query", () => {
    render(<SearchInput />);
    const inputElement = screen.getByPlaceholderText("Search...");
    const buttonElement = screen.getByRole("button");

    fireEvent.change(inputElement, { target: { value: "test search" } });
    fireEvent.click(buttonElement);

    expect(mockReplace).toHaveBeenCalledWith("/dashboard?search=test+search");
  });

  it("should submit the form without a search query", () => {
    render(<SearchInput />);
    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);

    expect(mockReplace).toHaveBeenCalledWith("/dashboard");
  });
});
