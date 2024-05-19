import {View} from 'react-native';

interface CardProps {
  size?: 'small' | 'medium';
  className?: string;
  children: React.ReactNode;
}

const Card = ({size = 'small', className, children}: CardProps) => {
  return (
    <View
      className={`${
        size === 'small' ? 'py-4' : 'py-5'
      } rounded-lg bg-white px-5 dark:bg-gray-950 ${className}`}>
      {children}
    </View>
  );
};

export default Card;
