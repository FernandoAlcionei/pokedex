import { render } from "@testing-library/react";
import Loader from "@/components/Loader";

describe("Loader", () => {
  it("should render correctly", () => {
    const { container } = render(
      <Loader />
    );

    expect(container).toMatchSnapshot();
  });
});
