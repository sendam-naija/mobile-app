import {
  useLogInMutation,
  useOtpRequestMutation,
  useOtpVerifyMutation,
  useSignUpMutation,
} from "@/services/onboarding.services";

const useOnboarding = () => {
  const [signUp, { isLoading: isSignUpLoading, error: signUpError }] =
    useSignUpMutation();
  const [logIn, { isLoading: isLogInLoading, error: logInError }] =
    useLogInMutation();
  const [
    otpRequest,
    { isLoading: isOtpRequestLoading, error: otpRequestError },
  ] = useOtpRequestMutation();
  const [otpVerify, { isLoading: isOtpVerifyLoading, error: otpVerifyError }] =
    useOtpVerifyMutation();

  return {
    signUp,
    logIn,
    otpRequest,
    otpVerify,
    isSignUpLoading,
    isLogInLoading,
    isOtpRequestLoading,
    isOtpVerifyLoading,
    signUpError,
    logInError,
    otpRequestError,
    otpVerifyError,
  };
};

export default useOnboarding;
