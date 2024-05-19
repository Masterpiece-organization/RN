import {View, Image} from 'react-native';
import {Avatar, Button, Card, Text} from '@/components';
import {clsx} from 'clsx';
import {ReactNode} from 'react';
import {matchListWrtapStyle} from '@/theme';
import {IMGS} from '@/constants';
import {ButtonType} from '@/components/Button/Button';

export interface MathListProps {
  title: string;
  image: string;
  content: string;
  type?: ButtonType;
  onPress: () => void;
  className?: string;
  children?: ReactNode;
}

const MatchList = ({
  title,
  image,
  content,
  onPress,
  type = 'text',
  className,
  children,
}: MathListProps) => {
  const WrapStyle = clsx(
    matchListWrtapStyle,
    className,
    type === 'outlined' && 'border border-gray-50',
  );

  return (
    <Button type="text" variant="custom" onPress={onPress}>
      <Card className={WrapStyle}>
        <View className="mr-4 h-16 w-16 rounded-full border border-gray-100">
          {/* <Image
            source={IMGS.testLogo}
            className="h-full w-full"
            resizeMode="cover"
          /> */}
          <Avatar type="club" size="medium" />
        </View>
        <View>
          {children}
          <Text weight="bold">{title}</Text>
          <Text type="caption" color="text-gray-700">
            {content}
          </Text>
        </View>
      </Card>
    </Button>
  );
};

export default MatchList;
