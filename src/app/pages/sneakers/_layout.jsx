import { Stack } from "expo-router";

const SneakerLayout = () => {
  return (
    <Stack
      /* Remove the subheader in the page */
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default SneakerLayout;
