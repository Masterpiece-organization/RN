import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigator from "@/navigation/AppNavigator";
import { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/utils/customToast";
import { MenuProvider } from "react-native-popup-menu";

function App(): JSX.Element {
  const queryClient = new QueryClient();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <MenuProvider>
              <SafeAreaProvider>
                <AppNavigator />
              </SafeAreaProvider>
            </MenuProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;

// const queryClient = new QueryClient();

// <QueryClientProvider client={queryClient}>
//   <ThemeContextProvider>
//     <ApiContextProvider>
//       <AuthContextProvider>
//         <Navigation />
//       </AuthContextProvider>
//     </ApiContextProvider>
//   </ThemeContextProvider>
// </QueryClientProvider>

// -----------THEME--------------
// // const colorTheme = useColorScheme();
// const {colorScheme, setColorScheme} = useColorScheme();

// const handleToggle = theme => {
//   setColorScheme(theme);
// };

// // -----------SELECT & CEHCKBOX--------------
// const [isOnPressed, setIsOnPressed] = useState(false);
// const [isChecked, setIsChecked] = useState(false);

// const handleSelectBtn = () => {
//   setIsOnPressed(prev => !prev);
// };

// const handleCheck = () => {
//   setIsChecked(prev => !prev);
//   setIsOnPressed(prev => !prev);
// };

// // --------------TEXT INPUT----------
// const {control, handleSubmit} = useForm<FieldValues>({
//   defaultValues: {
//     email: '',
//     password: '',
//     test: '',
//   },
// });

// const onSubmit = (data: FieldValues) => {
//   Alert.alert('Successful', JSON.stringify(data));
// };

// <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 100}}>
//   <SafeAreaView className="flex-1">
//     <View className="mx-[15px] mb-8">
//       <Text type="display" className="mb-4" color="text-primary">
//         텍스트 컴포넌트
//       </Text>
//       <Text type="display">디스플레이.</Text>
//       <Text type="header">헤더. 텍스트 테스트입니다.</Text>
//       <Text type="title">타이틀.</Text>
//       <Text type="body" weight="bold">
//         바디 볼드.
//       </Text>
//       <Text type="body" weight="semibold">
//         바디 세미볼드.
//       </Text>
//       <Text type="body" weight="medium">
//         바디 미듐.
//       </Text>
//       <Text type="body">바디.</Text>

//       <Text type="caption">캡션폰트.</Text>
//       <Text type="link" weight="medium">
//         링크폰트.
//       </Text>
//     </View>
//     <View className="mx-[15px] mb-8">
//       <Text type="display" className="mb-4" color="text-primary">
//         버튼 컴포넌트
//       </Text>
//       <Button label="메인버튼" className="mb-2" />
//       <Button label="세컨드" variant="secondary" className="mb-2" />
//       <Button label="비활성화 버튼" disabled={true} className="mb-2" />
//       <Button
//         variant="custom"
//         labelColor="text-black"
//         className="relative mb-2 bg-[#F8DD5F] active:bg-yellow">
//         <Image
//           source={require('@/assets/images/sns/kakao.png')}
//           className="absolute left-5 h-[24px] w-[24px]"
//         />
//         <Text color="text-black">커스텀</Text>
//       </Button>
//       <Button
//         type="outlined"
//         label="셀렉트"
//         color="white"
//         labelColor="text-gray-200"
//         className="mb-2"
//         isOnPressed={isOnPressed}
//         onPress={handleSelectBtn}
//       />
//       <Button
//         type="outlined"
//         variant="split"
//         className="mb-2"
//         onPress={handleCheck}
//         isOnPressed={isOnPressed}>
//         <View className="flex-row items-center">
//           <Avatar type="small" source="test" />
//           <Text className="ml-4" weight="medium">
//             맨체스터 시티
//           </Text>
//         </View>
//         <CheckBox checked={isChecked} />
//       </Button>
//       <CheckBox checked={isChecked} type="solid" />
//       <Button type="text" variant="split">
//         <Text>자주 묻는 질문</Text>
//         <RightIcon width={16} height={16} color="#B6B8BA" />
//       </Button>
//       <Button
//         label="라이트"
//         variant="custom"
//         onPress={() => handleToggle('light')}
//         className="mb-2 bg-sky-900"
//       />
//       <Button
//         label="다크"
//         variant="custom"
//         onPress={() => handleToggle('dark')}
//         className="mb-2 bg-sky-900"
//       />

//       <Button
//         label="시스템"
//         variant="custom"
//         onPress={() => handleToggle('system')}
//         className="mb-2 bg-sky-900"
//       />
//     </View>
//     <View className="mx-[15px] mb-8">
//       <Text type="display" className="mb-4" color="text-primary">
//         인풋 컴포넌트
//       </Text>

//       <TextInput
//         control={control}
//         name="email"
//         placeholder="이메일 주소"
//         keyboardType="email-address"
//         rules={{
//           required: '이메일을 입력해주세요.',
//           pattern: {
//             value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
//             message: '이메일 형식이 아닙니다.',
//           },
//         }}
//         className="mb-2"
//       />
//       <TextInput
//         control={control}
//         name="password"
//         placeholder="비밀번호"
//         secureTextEntry
//         rules={{required: '비밀번호를 입력해주세요.'}}
//         label="비밀번호"
//         className="mb-2"
//       />
//       <TextInput
//         control={control}
//         name="test"
//         placeholder="테스트"
//         className="mb-2"
//         editable={false}
//       />
//       <Button
//         label="메인버튼"
//         className="mb-2"
//         onPress={handleSubmit(onSubmit)}
//       />
//     </View>
//     <View className="flex-row justify-center space-x-2">
//       <View>
//         <InfoCard
//           label="테스트"
//           content="테스트입니다."
//           icon={<RightIcon />}
//         />
//       </View>
//       <View>
//         <InfoCard
//           label="테스트"
//           content="테스트입니다."
//           icon={<RightIcon />}
//         />
//       </View>
//       <View>
//         <InfoCard
//           label="테스트"
//           content="테스트입니다."
//           icon={<RightIcon />}
//         />
//       </View>
//     </View>
//   </SafeAreaView>
// </KeyboardAwareScrollView>

// float button wrap
{
  /* <SafeAreaView>
<View className="flex-1">
  <Button
    label="인증번호 요청"
    onPress={handleSubmit(onSubmit)}
    className="absolute bottom-0 left-5 right-5 "
    float
  />
</View>
</SafeAreaView> */
}
