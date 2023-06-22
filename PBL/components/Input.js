import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChange
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          onChangeText={onChange}
          value={value}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChange}
          style={{ flex: 1, paddingVertical: 0 }}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: '#669966', fontWeight: '700' }}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}