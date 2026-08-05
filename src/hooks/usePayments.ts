import {
  useCancelPaymentRequestMutation,
  useCreatePaymentRequestMutation,
  useGetPaymentRequestQuery,
  useGetPaymentRequestsQuery,
} from "@/services/payment.services";

const usePayments = (paymentRequestId?: string) => {
  const {
    data: paymentRequests,
    isLoading: paymentRequestsIsLoading,
    isError: paymentRequestsIsError,
    error: paymentRequestsError,
    refetch: paymentRequestsRefetch,
  } = useGetPaymentRequestsQuery();

  const {
    data: paymentRequest,
    isLoading: paymentRequestIsLoading,
    isError: paymentRequestIsError,
    error: paymentRequestError,
    refetch: paymentRequestRefetch,
  } = useGetPaymentRequestQuery(paymentRequestId ?? "", {
    skip: !paymentRequestId,
  });

  const [createPaymentRequest, { isLoading: createPaymentRequestIsLoading }] =
    useCreatePaymentRequestMutation();

  const [cancelPaymentRequest, { isLoading: cancelPaymentRequestIsLoading }] =
    useCancelPaymentRequestMutation();

  return {
    paymentRequests: paymentRequests?.data ?? [],
    paymentRequestsIsLoading,
    paymentRequestsIsError,
    paymentRequestsError,
    paymentRequestsRefetch,
    paymentRequest: paymentRequest?.data ?? null,
    paymentRequestIsLoading,
    paymentRequestIsError,
    paymentRequestError,
    paymentRequestRefetch,
    createPaymentRequest,
    createPaymentRequestIsLoading,
    cancelPaymentRequest,
    cancelPaymentRequestIsLoading,
  };
};

export default usePayments;
