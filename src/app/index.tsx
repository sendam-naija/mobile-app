import { useTokenRotationMutation } from "@/services/onboarding.services";
import { saveRefreshToken, saveToken } from "@/store/userDetails";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { isAuthenticated, refreshToken } = useSelector(
    (state: any) => state?.user,
  );
  const [tokenRotation, { isLoading }] = useTokenRotationMutation();
  const handleTokenRotation = async () => {
    try {
      const res = await tokenRotation({ refreshToken }).unwrap();
      dispatch(saveToken(res?.data?.accessToken));
      dispatch(saveRefreshToken(res?.data?.refreshToken));
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated && refreshToken) handleTokenRotation();
  }, [isAuthenticated, refreshToken]);
  return isAuthenticated ? (
    <Redirect href={"/dashboard"} />
  ) : (
    <Redirect href={"/auth/login"} />
  );
}
