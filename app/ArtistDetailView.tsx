import React from "react";
import { View, Text, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import styled from "styled-components/native";

// Styled components
const Container = styled(View)`
  flex: 1;
  padding: 20px;
  align-items: center;
  background-color: #fff;
`;

const ArtistImage = styled(Image)`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const ArtistName = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ArtistId = styled(Text)`
  font-size: 16px;
  color: #666;
`;

export default function ArtistDetailView() {
  const { id, name, image } = useLocalSearchParams(); // Access route parameters

  return (
    <Container>
      <ArtistImage source={{ uri: image.toString() }} testID="artist-detail-image" />
      <ArtistName testID="artist-detail-name">{name}</ArtistName>
      <ArtistId testID="artist-detail-id">Artist ID: {id}</ArtistId>
    </Container>
  );
}
