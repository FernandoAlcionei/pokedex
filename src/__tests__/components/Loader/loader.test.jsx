import { render } from "@testing-library/react";
import Loader from "@/components/Loader";

describe("Loader Component", () => {
  it("should render the Loader component correctly", () => {
    const { container } = render(
      <Loader />
    );

    expect(container).toMatchSnapshot();
  });
});
