import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.88,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    overflow: 'hidden',
  },

  darkContainer: {
    backgroundColor: '#333',
  },

  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    marginTop: 34,
    marginBottom: 20,
    marginHorizontal: 15,
  },

  darkTitle: {
    color: '#eee',
  },

  message: {
    fontSize: 14,
    color: '#666',
    marginTop: 14,
    marginBottom: 28,
    marginHorizontal: 15,
    lineHeight: 20,
  },

  darkMessage: {
    color: '#bbb',
  },

  hBtnGroup: {
    flexDirection: 'row',
    height: 60,
  },

  vBtnGroup: {
    width: '100%',
  },

  hBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flex: 1,
  },

  vBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
  },

  hItem: {
    height: 60,
    flex: 1,
    flexDirection: 'column-reverse',
  },
  vItem: {
    flexDirection: 'row-reverse',
    width: '100%',
    height: 50,
  },

  btnText: {
    fontSize: 18,
    color: '#555',
  },

  darkBtnText: {
    color: '#ddd',
  },
});
