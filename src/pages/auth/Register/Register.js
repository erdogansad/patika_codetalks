import {View, Text, TextInput} from 'react-native';
import React from 'react';
import styles from './Register.style';
import Button from '../../../components/Button';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {useForm, Controller} from 'react-hook-form';

const Register = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    if (Object.keys(errors).length > 0) {
      showMessage({
        message: errors[Object.keys(errors)[0]].message || 'Hata oluştu.',
        type: 'danger',
      });
      return;
    } else {
      auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(resp => {
          showMessage({
            message: 'Kayıt başarılı!',
            type: 'success',
          });
        })
        .catch(err => {
          showMessage({
            message: err.code,
            type: 'danger',
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Text style={styles.logo_text}>codetalks</Text>
      </View>
      <View style={styles.inputs_container}>
        <Controller
          defaultValue=""
          name="email"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'E-posta alanı zorunludur.',
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'E-posta formatı hatalı.',
            },
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder="e-postanızı giriniz.."
            />
          )}
        />
        <Controller
          defaultValue=""
          name="password"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Şifre alanı zorunludur.',
            },
            minLength: {
              value: 6,
              message: 'Şifre en az 6 karakter olmalıdır.',
            },
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              secureTextEntry
              onChangeText={onChange}
              value={value}
              placeholder="şifrenizi giriniz.."
            />
          )}
        />
        <Controller
          defaultValue=""
          name="password_repeat"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Şifre tekrar alanı zorunludur.',
            },
            minLength: {
              value: 6,
              message: 'Şifre en az 6 karakter olmalıdır.',
            },
            validate: (value, data) => {
              return value === data.password || 'Şifreler eşleşmiyor.';
            },
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              secureTextEntry
              onChangeText={onChange}
              value={value}
              placeholder="şifrenizi tekrar giriniz.."
            />
          )}
        />
        <View style={styles.buttons_container}>
          <Button title="Kayıt Ol" onPress={handleSubmit(onSubmit)} />
          <Button
            title="Geri"
            onPress={() => navigation.goBack()}
            theme="secondary"
          />
        </View>
      </View>
    </View>
  );
};

export default Register;
