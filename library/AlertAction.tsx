import * as React from 'react';
import { Divide } from 'rn-divide';
import { DarklyText } from 'rn-darkly';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export const AlertAction: React.FC<{
  text: string;
  style?: StyleProp<TextStyle>;
  dark_style?: StyleProp<TextStyle>;
  onPress: () => void;
  divideVisible?: boolean;
  horizontal: boolean;
  forceDark?: boolean;
}> = ({
  horizontal,
  text,
  forceDark,
  style,
  dark_style,
  divideVisible,
  onPress,
}) => {
  return (
    <Divide
      forceDark={forceDark}
      horizontal={!horizontal}
      style={horizontal ? styles.hItem : styles.vItem}
      visible={divideVisible}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={horizontal ? styles.hBtn : styles.vBtn}>
        <DarklyText
          forceDark={forceDark}
          dark_style={[styles.darkBtnText, dark_style]}
          style={[styles.btnText, style]}>
          {text}
        </DarklyText>
      </TouchableOpacity>
    </Divide>
  );
};
