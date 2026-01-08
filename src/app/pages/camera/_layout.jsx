import { Stack } from "expo-router";

const CameraLayout = () => {
  return (
    <Stack
      /* Remove the subheader in the page */
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default CameraLayout;
