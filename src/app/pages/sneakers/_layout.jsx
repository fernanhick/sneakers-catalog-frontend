import { Stack } from "expo-router";

const SneakerLayout = () => {
  return (
    <Stack
      /* Remove the subheader in the page */
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen
        name="screens/AddSneakerScreen"
        options={{
          headerTitle: "Add Sneaker",
          presentation: "pageSheet",
          drawerItemStyle: { display: "none" },
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default SneakerLayout;
