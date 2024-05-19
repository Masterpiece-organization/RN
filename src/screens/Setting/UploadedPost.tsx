import {Button, Card, Text, MatchList} from '@/components';
import {View, Image, ScrollView} from 'react-native';
import {containerStyle} from '@/theme';
import {SettingScreenProps, SettingScreens} from '@/types/navigationTypes';
import {FlashList} from '@shopify/flash-list';

const defaultWrapStyle = 'flex-row items-center rounded-lg bg-white px-5 py-4';

const UploadedPost = ({
  navigation,
}: SettingScreenProps<SettingScreens.MY_PAGE>) => {
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 160}}
      className="bg-gray-50 pb-14 dark:bg-black">
      <View className={containerStyle('card')}>
        <View className="space-y-2">
          <View>
            <Button type="text" variant="custom">
              <Card className={defaultWrapStyle}>
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-sky-100 px-1.5">
                      <Text color="text-blue" type="caption" weight="semibold">
                        일반
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남 11vs11
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">10월 10일 화요일 14:00 - 17:00</Text>
                  <Text type="caption" color="text-gray-700">
                    서울 서초구 방배동 1000-1234
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
          <View>
            <Button type="text" variant="custom">
              <Card className={defaultWrapStyle}>
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-rose-100 px-1.5">
                      <Text color="text-red" type="caption" weight="semibold">
                        경기임박
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-100 px-1.5">
                      <Text color="text-black" type="caption" weight="semibold">
                        자체
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남 11vs11
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">10월 10일 화요일 14:00 - 17:00</Text>
                  <Text type="caption" color="text-gray-700">
                    서울 서초구 방배동 1000-1234
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
          <View>
            <Button type="text" variant="custom">
              <Card className={defaultWrapStyle}>
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-emerald-100 px-1.5">
                      <Text color="text-green" type="caption" weight="semibold">
                        용병
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남 11vs11
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">10월 10일 화요일 14:00 - 17:00</Text>
                  <Text type="caption" color="text-gray-700">
                    서울 서초구 방배동 1000-1234
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
          <View>
            <Button type="text" variant="custom">
              <Card className={defaultWrapStyle}>
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-amber-100 px-1.5">
                      <Text
                        color="text-yellow"
                        type="caption"
                        weight="semibold">
                        입단
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남성
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">축구에이스 입단신청합니다.</Text>
                  <Text type="caption" color="text-gray-700">
                    정세욱똥
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
          <View>
            <Button type="text" variant="custom">
              <Card className={defaultWrapStyle}>
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-orange-100 px-1.5">
                      <Text
                        color="text-[#FB923C]"
                        type="caption"
                        weight="semibold">
                        영입
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남성
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">11년 전통의 갈현축구회</Text>
                  <Text type="caption" color="text-gray-700">
                    갈현짱짱맨
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
          <View>
            <Button type="text" variant="custom">
              <Card className={defaultWrapStyle}>
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-amber-100 px-1.5">
                      <Text
                        color="text-yellow"
                        type="caption"
                        weight="semibold">
                        입단
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남성
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">축구에이스 입단신청합니다.</Text>
                  <Text type="caption" color="text-gray-700">
                    정세욱똥
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
          <View>
            <Button type="text" variant="custom">
              <Card className={defaultWrapStyle}>
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-orange-100 px-1.5">
                      <Text
                        color="text-[#FB923C]"
                        type="caption"
                        weight="semibold">
                        영입
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남성
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">11년 전통의 갈현축구회</Text>
                  <Text type="caption" color="text-gray-700">
                    갈현짱짱맨
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
          <View>
            <Button type="text" variant="custom">
              <Card className={defaultWrapStyle}>
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-amber-100 px-1.5">
                      <Text
                        color="text-yellow"
                        type="caption"
                        weight="semibold">
                        입단
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남성
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">축구에이스 입단신청합니다.</Text>
                  <Text type="caption" color="text-gray-700">
                    정세욱똥
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
          <View>
            <Button type="text" variant="custom">
              <Card className={defaultWrapStyle}>
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-orange-100 px-1.5">
                      <Text
                        color="text-[#FB923C]"
                        type="caption"
                        weight="semibold">
                        영입
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남성
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">11년 전통의 갈현축구회</Text>
                  <Text type="caption" color="text-gray-700">
                    갈현짱짱맨
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
          <View>
            <Button type="text" variant="custom">
              <Card className={defaultWrapStyle}>
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-amber-100 px-1.5">
                      <Text
                        color="text-yellow"
                        type="caption"
                        weight="semibold">
                        입단
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남성
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">축구에이스 입단신청합니다.</Text>
                  <Text type="caption" color="text-gray-700">
                    정세욱똥
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
          <View>
            <Button type="text" variant="custom">
              <Card className={defaultWrapStyle}>
                <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
                  <Image
                    // source={require(image)}
                    source={require('@/assets/images/logo.png')}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <View className="mb-1.5 flex-row space-x-1">
                    <View className="py-.5 self-start rounded bg-orange-100 px-1.5">
                      <Text
                        color="text-[#FB923C]"
                        type="caption"
                        weight="semibold">
                        영입
                      </Text>
                    </View>
                    <View className="py-.5 self-start rounded bg-gray-50 px-1.5">
                      <Text
                        color="text-gray-300"
                        type="caption"
                        weight="semibold">
                        남성
                      </Text>
                    </View>
                  </View>

                  <Text weight="bold">11년 전통의 갈현축구회</Text>
                  <Text type="caption" color="text-gray-700">
                    갈현짱짱맨
                  </Text>
                </View>
              </Card>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UploadedPost;
