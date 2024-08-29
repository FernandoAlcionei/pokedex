import { render, screen, fireEvent } from "@testing-library/react";
import PokemonCard from "@/components/PokemonCard";

describe("PokemonCard Component", () => {
  const mockAddFavorite = jest.fn();
  const mockPokemon = {
    name: "pikachu",
    favorite: false,
    types: ["electric"],
    image: "/pikachu.png",
  };

  beforeEach(() => {
    mockAddFavorite.mockClear();
  });

  it("should render the PokemonCard correctly", () => {
    render(<PokemonCard pokemon={mockPokemon} addFavorite={mockAddFavorite} />);
    
    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByAltText("pikachu")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockPokemon.image);
  });

  it("should display the correct types", () => {
    render(<PokemonCard pokemon={mockPokemon} addFavorite={mockAddFavorite} />);
    
    expect(screen.getByText("electric")).toBeInTheDocument();
  });

  it("should call addFavorite and toggle favorite state on button click", () => {
    render(<PokemonCard pokemon={mockPokemon} addFavorite={mockAddFavorite} />);
    
    const favoriteButton = screen.getByRole("button");
    
    expect(favoriteButton.querySelector("svg")).toHaveAttribute("fill", "transparent");

    fireEvent.click(favoriteButton);
    
    expect(mockAddFavorite).toHaveBeenCalledWith("pikachu");
    expect(favoriteButton.querySelector("svg")).toHaveAttribute("fill", "#d41a46");
    
    fireEvent.click(favoriteButton);

    expect(mockAddFavorite).toHaveBeenCalledWith("pikachu");
    expect(favoriteButton.querySelector("svg")).toHaveAttribute("fill", "transparent");
  });
});
