import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

describe("Navbar Component", () => {
  const mockPush = jest.fn();
  const mockLogout = jest.fn();
  const mockTranslate = jest.fn();
  const mockUseSearchParams = new URLSearchParams();

  beforeEach(() => {
    usePathname.mockReturnValue("/dashboard");
    useSearchParams.mockReturnValue(mockUseSearchParams);

    useRouter.mockReturnValue({ push: mockPush });
    useTranslations.mockReturnValue(mockTranslate);
    mockPush.mockClear();
    mockLogout.mockClear();
    mockTranslate.mockReturnValue("Logout");
  });

  it("should render the Navbar component correctly", () => {
    render(<Navbar logout={mockLogout} />);

    const logo = screen.getByAltText("Pokedex logo");
    expect(logo).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it("should call logout function and navigate to home page on logout button click", async () => {
    render(<Navbar logout={mockLogout} />);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
