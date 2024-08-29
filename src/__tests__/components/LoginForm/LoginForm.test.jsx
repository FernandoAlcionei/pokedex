import { render, screen, fireEvent, act } from "@testing-library/react";
import LoginForm from "@/components/LoginForm";
import { useTranslations } from "next-intl";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

describe("LoginForm Component", () => {
  const mockSubmit = jest.fn();
  const mockTranslate = jest.fn((key) => key);

  beforeEach(() => {
    useTranslations.mockReturnValue(mockTranslate);
    mockSubmit.mockClear();
  });

  it("should render the LoginForm component correctly", () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const usernameInput = screen.getByPlaceholderText("enter-username");
    const passwordInput = screen.getByPlaceholderText("enter-password");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /sign-in/i });
    expect(submitButton).toBeInTheDocument();

    const forgotPasswordLink = screen.getByText("forgot-your-password");
    const registerLink = screen.getByText("register-here");
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  it("should call onSubmit with correct credentials when the form is submitted", async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const usernameInput = screen.getByPlaceholderText("enter-username");
    const passwordInput = screen.getByPlaceholderText("enter-password");
    const submitButton = screen.getByRole("button", { name: /sign-in/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    await act(() => {
      fireEvent.click(submitButton);
    })

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({ username: "testuser", password: "password123" });
  });

  it("should display validation errors when fields are empty", async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const submitButton = screen.getByRole("button", { name: /sign-in/i });

    await act(() => {
      fireEvent.click(submitButton);
    });

    const usernameError = await screen.findByText("username-is-required");
    const passwordError = await screen.findByText("password-is-required");
    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
