const getCommonScreen = ({Stack, screens}) => {
  return (
    <>
      {screens.map(({name, screen, options}) => (
        <Stack.Screen
          name={name}
          component={screen}
          options={options}
          key={name}
        />
      ))}
    </>
  );
};

export default getCommonScreen;
