import {View} from 'react-native';
import {clsx} from 'clsx';
import Text from '../Text';

const TAG_TYPES = ['post', 'numOfPlayers', 'isImminent'] as const;

const POST_TYPES = [
  'private',
  'public',
  'guest',
  'recruitment',
  'application',
] as const;

const NUMBER_OF_PLAYERS = [
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
] as const;

const GENDER_TYPES = ['male', 'female'];

type TagType = (typeof TAG_TYPES)[number];
type PostType = (typeof POST_TYPES)[number];
type NumberOfPlayersType = (typeof NUMBER_OF_PLAYERS)[number];
type GenderType = (typeof GENDER_TYPES)[number];

interface TagProps {
  type?: TagType;
  postType?: PostType;
  numOfPlayers?: NumberOfPlayersType;
  isImminent?: boolean;
  gender?: GenderType;
  className?: string;
}

const postVariants = {
  post: {
    private: '자체',
    public: '일반',
    guest: '용병',
    recruitment: '영입',
    application: '입단',
  },
  numOfPlayers: {
    3: '3vs3',
    4: '4vs4',
    5: '5vs5',
    6: '6vs6',
    7: '7vs7',
    8: '8vs8',
    9: '9vs9',
    10: '10vs10',
    11: '11vs11',
  },
  isImminent: '경기임박',
};

const genderVariants = {
  male: '남',
  female: '여',
};

const Tag = ({
  type = 'post',
  postType = 'public',
  numOfPlayers = '11',
  isImminent = false,
  gender = 'male',
  className,
}: TagProps) => {
  const defaultTagStyle = 'rounded-md bg-red px-[6px]';

  let displayContent = '';
  if (type === 'post' && postType) {
    displayContent = postVariants[type][postType];
  } else if (type === 'numOfPlayers' && numOfPlayers) {
    displayContent = `${genderVariants[gender]} ${postVariants[type][numOfPlayers]}`;
  } else if (type === 'isImminent' && isImminent) {
    displayContent = postVariants[type];
  }

  const tagStyle = clsx(defaultTagStyle, className);

  return (
    <View className={tagStyle}>
      <Text type="caption" weight="medium">
        {displayContent}
      </Text>
    </View>
  );
};

export default Tag;
