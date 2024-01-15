export interface Spot {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
  image: string;
  rating?: number;
  type?: string;
}

export interface Coords {
  lat: number;
  lng: number;
}

export const getInitialSpots = (): Spot[] => {
  return [
    {
      id: 5,
      name: "Spot 5",
      lat: 34.0522,
      lng: -118.2437,
      description: "This is spot 5",
      image: "https://picsum.photos/200",
    },
    {
      id: 6,
      name: "Spot 6",
      lat: 51.5074,
      lng: -0.1278,
      description: "This is spot 6",
      image: "https://picsum.photos/200",
    },
    {
      id: 7,
      name: "Spot 7",
      lat: -33.8688,
      lng: 151.2093,
      description: "This is spot 7",
      image: "https://picsum.photos/200",
    },
    {
      id: 8,
      name: "Spot 8",
      lat: 35.6895,
      lng: 139.6917,
      description: "This is spot 8",
      image: "https://picsum.photos/200",
    }];
};