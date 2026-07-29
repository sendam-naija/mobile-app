import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const { isAuthenticated } = useSelector((state: any) => state?.user);
  return isAuthenticated ? (
    <Redirect href={"/dashboard"} />
  ) : (
    <Redirect href={"/auth/login"} />
  );
}
