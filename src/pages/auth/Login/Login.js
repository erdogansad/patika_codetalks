import {View, Text, TextInput} from 'react-native';
import React from 'react';
import styles from './Login.style';
import Button from '../../../components/Button';
import {useForm, Controller} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
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
        .signInWithEmailAndPassword(data.email, data.password)
        .then(resp => {
          showMessage({
            message: 'Giriş başarılı!',
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
              placeholder="e-postanızı giriniz.."
              onChangeText={onChange}
              value={value}
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
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholderTextColor="white"
              style={styles.input}
              secureTextEntry
              placeholder="şifrenizi giriniz.."
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <View style={styles.buttons_container}>
          <Button title="Giriş Yap" onPress={handleSubmit(onSubmit)} />
          <Button
            title="Kayıt Ol"
            onPress={() => navigation.navigate('Register')}
            theme="secondary"
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
