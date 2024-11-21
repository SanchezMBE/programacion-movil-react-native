import React from "react";
import { render } from "@testing-library/react-native";
import ArtistBox from "@/components/ArtistBox";
import { Artist } from "@/types/artist";

describe("ArtistBox", () => {
  const mockArtist: Artist = {
      id: 1,
      name: "Artist",
      image: "image.jpg",
  };

  it("renders the artist name correctly", () => {
    const { getByText } = render(<ArtistBox artist={mockArtist} />);
    expect(getByText(mockArtist.name)).toBeTruthy();
  });

  it("renders the artist image correctly", () => {
    const { getByTestId } = render(<ArtistBox artist={mockArtist} />);
    const image = getByTestId("artist-image");
    expect(image.props.source.uri).toBe(mockArtist.image);
  });
});