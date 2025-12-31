import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      /* Remove the subheader in the page */
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default AuthLayout;
