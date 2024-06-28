import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const Input = React.forwardRef<TextInput, any>(({icon, ...rest}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleIconPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleContainerPress = () => {
    if (!isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}
      onPress={handleContainerPress}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleIconPress}>
        {icon}
      </TouchableOpacity>
      <TextInput
        ref={input => {
          if (input) {
            inputRef.current = input;
          }
        }}
        style={styles.input}
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#F4F5F7',
  },
  inputContainerFocused: {
    borderColor: '#1C67F6',
    borderWidth: 2,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 15,
    flexWrap: 'wrap',
  },
  iconContainer: {
    marginRight: 5,
  },
});

export default Input;