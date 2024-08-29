import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Pagination Component", () => {
  const mockReplace = jest.fn();
  const mockOnPageChange = jest.fn();
  const mockUseSearchParams = new URLSearchParams();

  beforeEach(() => {
    useRouter.mockReturnValue({ replace: mockReplace });
    usePathname.mockReturnValue("/dashboard");
    useSearchParams.mockReturnValue(mockUseSearchParams);
    mockReplace.mockClear();
    mockOnPageChange.mockClear();
  });

  it("should render pagination buttons correctly", () => {
    render(
      <Pagination
        currentPage={1}
        totalCount={50}
        onPageChange={mockOnPageChange}
        pageSize={10}
      />
    );

    expect(screen.getByTestId('previous')).toBeDisabled();
    expect(screen.getByTestId('next')).not.toBeDisabled();

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should call onPageChange and navigate correctly when a page number is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalCount={50}
        onPageChange={mockOnPageChange}
        pageSize={10}
      />
    );

    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);

    expect(mockReplace).toHaveBeenCalledWith("/dashboard?page=3");
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("should call onPageChange and navigate to the next page when next button is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalCount={50}
        onPageChange={mockOnPageChange}
        pageSize={10}
      />
    );

    const nextButton = screen.getByTestId('next')
    fireEvent.click(nextButton);

    expect(mockReplace).toHaveBeenCalledWith("/dashboard?page=2");
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onPageChange and navigate to the previous page when previous button is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalCount={50}
        onPageChange={mockOnPageChange}
        pageSize={10}
      />
    );

    const previousButton = screen.getByTestId('previous');
    fireEvent.click(previousButton);

    expect(mockReplace).toHaveBeenCalledWith("/dashboard?page=1");
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it("should disable the next button on the last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalCount={50}
        onPageChange={mockOnPageChange}
        pageSize={10}
      />
    );

    expect(screen.getByTestId('next')).toBeDisabled();
  });
});
