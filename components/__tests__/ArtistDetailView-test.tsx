import React from "react";
import { render } from "@testing-library/react-native";
import ArtistDetailView from "@/app/ArtistDetailView";
import { useRouter, useLocalSearchParams } from "expo-router";

// Mock de Expo Router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
}));

describe("ArtistDetailView Component", () => {
  const mockRouterBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ back: mockRouterBack });
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      id: 1,
      name: "Artist",
      image: "image.png",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText} = render(<ArtistDetailView />);

    // Verifica que los detalles del artista están renderizados
    expect(getByText("Artist")).toBeTruthy();
    expect(getByText("Artist ID: 1")).toBeTruthy();
  });
});