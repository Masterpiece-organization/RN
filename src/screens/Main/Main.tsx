import {Container, Text, Button} from '@/components';
import {View} from 'react-native';
import {useMainContext} from '@/contexts/MainContext';

const Main = () => {
  const contexts = useMainContext();

  return (
    <Container>
      <View>
        <Text>test</Text>
        <Text>test</Text>
        <Button label="로그아웃" onPress={contexts?.logout || (() => {})} />
      </View>
    </Container>
  );
};

export default Main;
