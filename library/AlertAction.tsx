import { Divide } from 'rn-divide';
import { DarklyText } from 'rn-darkly';
import * as React from 'react';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export const AlertAction: React.FC<{
  text: string;
  style?: StyleProp<TextStyle>;
  dark_style?: StyleProp<TextStyle>;
  onPress: () => void;
  divideVisible?: boolean;
  horizontal: boolean;
}> = ({ horizontal, text, style, dark_style, divideVisible, onPress }) => {
  return (
    <Divide
      horizontal={!horizontal}
      style={horizontal ? styles.hItem : styles.vItem}
      visible={divideVisible}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={horizontal ? styles.hBtn : styles.vBtn}>
        <DarklyText
          dark_style={[styles.darkBtnText, dark_style]}
          style={[styles.btnText, style]}>
          {text}
        </DarklyText>
      </TouchableOpacity>
    </Divide>
  );
};
