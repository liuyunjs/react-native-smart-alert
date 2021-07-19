import { Divide } from 'rn-divide';
import { DarklyText, DarklyTouchableHighlight } from 'rn-darkly';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { styles } from './styles';

export const AlertAction: React.FC<{
  text: string;
  style?: StyleProp<TextStyle>;
  darkStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  divideVisible?: boolean;
  horizontal: boolean;
}> = ({ horizontal, text, style, darkStyle, divideVisible, onPress }) => {
  return (
    <Divide
      horizontal={horizontal}
      style={horizontal ? styles.hItem : styles.vItem}
      visible={divideVisible}>
      <DarklyTouchableHighlight
        underlayColor="rgba(0, 0, 0, .15)"
        onPress={onPress}
        style={horizontal ? styles.hBtn : styles.vBtn}>
        <DarklyText
          darkStyle={[styles.darkBtnText, darkStyle]}
          style={[styles.btnText, style]}>
          {text}
        </DarklyText>
      </DarklyTouchableHighlight>
    </Divide>
  );
};
