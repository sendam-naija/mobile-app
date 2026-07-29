import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import type { ToastConfig } from "react-native-toast-message";
import AppText from "./AppText";
import { CloseCircle, TickCircle } from "iconsax-react-nativejs";

type CustomToastProps = {
  text1?: string;
  text2?: string;
};

const useToastAnimation = () => {
  const translateY = useRef(new Animated.Value(-80)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        damping: 14,
        stiffness: 140,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        damping: 10,
        stiffness: 160,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale, translateY]);

  return {
    opacity,
    transform: [{ translateY }, { scale }],
  };
};

const CustomToast = ({ text1, text2 }: CustomToastProps) => {
  const animatedStyle = useToastAnimation();

  return (
    <Animated.View
      style={[
        {
          width: "95%",
          backgroundColor: "#000",
          borderColor: "#6B7280",
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        },
        animatedStyle,
      ]}
      className="py-4 rounded-full px-5"
    >
      <TickCircle size="40" color="#16A24A" />

      <View className="flex-1 gap-1.5">
        <AppText variant="large" font="SM" className="text-white">
          {text1}
        </AppText>

        {text2 && (
          <AppText
            size={15}
            className="text-white opacity-70 leading-6"
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {text2}
          </AppText>
        )}
      </View>
    </Animated.View>
  );
};

const CustomToastError = ({ text1, text2 }: CustomToastProps) => {
  const animatedStyle = useToastAnimation();

  return (
    <Animated.View
      style={[
        {
          width: "95%",
          backgroundColor: "#000",
          borderColor: "#6B7280",
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        },
        animatedStyle,
      ]}
      className="py-4 rounded-full px-5"
    >
      <CloseCircle size="40" color="#EF4444" />

      <View className="flex-1 gap-1.5">
        <AppText variant="large" font="SM" className="text-white">
          {text1}
        </AppText>

        {text2 && (
          <AppText
            size={15}
            className="text-white opacity-70 leading-6"
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {text2}
          </AppText>
        )}
      </View>
    </Animated.View>
  );
};

const toastConfig: ToastConfig = {
  customSlideSuccess: (props) => <CustomToast {...props} />,
  customSlideError: (props) => <CustomToastError {...props} />,
};

export default toastConfig;
