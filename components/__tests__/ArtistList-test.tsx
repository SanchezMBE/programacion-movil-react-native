import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ArtistList from "@/components/ArtistList";
import { useRouter } from "expo-router";
import { Artist } from "@/types/artist";

// Mock de useRouter
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("ArtistList Component", () => {
  const mockArtists: Artist[] = [
    { id: 1, name: "Artist 1", image: "image1.jpg" },
    { id: 2, name: "Artist 2", image: "image2.jpg" },
  ];

  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a list of artists correctly", () => {
    const { getByTestId } = render(<ArtistList artists={mockArtists} />);
    mockArtists.forEach((artist) => {
      const artistBox = getByTestId(`artist-box-${artist.name}`);
      expect(artistBox).toBeTruthy();
    });
  });

  it("navigates to artist detail on artist press", () => {

    const { getByTestId } = render(<ArtistList artists={mockArtists} />);
    const artistBox = getByTestId(`artist-box-${mockArtists[0].name}`);
    fireEvent.press(artistBox);

    // Verifica que la navegación ocurrió con los parámetros correctos
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/ArtistDetailView",
      params: {
        id: mockArtists[0].id,
        name: mockArtists[0].name,
        image: mockArtists[0].image,
      },
    });
  });
});