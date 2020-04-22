import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { Picker } from '@react-native-community/picker';
import styled from 'styled-components';
import {
  ContainerCenterSB,
  TitleCenter,
  ToBack,
  ImageBackground,
  Close,
} from '~/components/Common/Common';
import {
  Button as BaseButton,
  Input,
  TextInputMask,
} from '~/components/Form/Inputs';
import { BaseText } from '~/components/Text/Text';
import { PageNavProps } from '~/Types/PageList';
import {
  validateMinLength,
  validateEmail,
  validateEqualLength,
} from '~/utils/validate';
import api from '~/utils/http';
import Loading from '~/components/Loading/Loading';
import Select from '~/components/Form/Select';
import Feedback from '~/components/Feedback/Feedback';
import StepDot from '~/components/StepDot/StepDot';
import Profile from '~/components/Profile/Profile';
import ImagePicker, { ImagePickerOptions } from 'react-native-image-picker';
import Permissions from '~/utils/Permissions';

interface RegisterPageProps extends PageNavProps<'RegisterPage'> {}

interface RegisterData {
  userType: 'musician' | 'promoter';
  name: string;
  nickName: string;
  email: string;
  password: string;
  birthdate: string;
  phoneNumber: string;
  avatar: string;
}

type RegisterDataError = {
  [key in keyof RegisterData]: {
    isInvalid: boolean;
    message: string;
  };
};

const DEFAULT_DATA: RegisterData = {
  userType: 'musician',
  name: '',
  nickName: '',
  email: '',
  password: '',
  birthdate: '',
  phoneNumber: '',
  avatar: '',
};

const DEFAULT_DATA_ERROR: RegisterDataError = {
  userType: {
    isInvalid: false,
    message: 'Tipo de usuário inválido.',
  },
  name: {
    isInvalid: false,
    message: 'Por favor, insira seu nome completo.',
  },
  nickName: {
    isInvalid: false,
    message: 'NickName inválido.',
  },
  email: {
    isInvalid: false,
    message: 'Insira um email válido.',
  },
  password: {
    isInvalid: false,
    message: 'A senha deve conter no mínimo 8 caracteres.',
  },
  birthdate: {
    isInvalid: false,
    message: 'Data de nascimento inválida.',
  },
  phoneNumber: {
    isInvalid: false,
    message: 'Número de telefone inválido.',
  },
};

const RegisterPage: React.FunctionComponent<RegisterPageProps> = ({
  navigation,
}) => {
  const [step, setStep] = useState<number>(1);
  const [dataForm, setDataForm] = useState<RegisterData>(DEFAULT_DATA);
  const [hasError, setHasError] = useState<boolean>(false);
  const [response, setResponse] = useState<{
    success: boolean;
    message: string;
  }>({
    success: false,
    message: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataError, setDataError] = useState<RegisterDataError>(
    DEFAULT_DATA_ERROR,
  );

  const handleChange = (value: string, inputName: string) => {
    setDataForm((prev) => ({ ...prev, [inputName]: value }));
    if (hasError) {
      setHasError(false);
      setDataError(DEFAULT_DATA_ERROR);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    api
      .post('user', {
        ...dataForm,
        userType: 'promoter',
        birthdate: dataForm.birthdate.split('/').reverse().join('-'),
        phoneNumber: dataForm.phoneNumber.replace(/\D/g, ''),
      })
      .then((response) => {
        console.log(response);
        const status: boolean = response?.data?.status || false;
        const message: string = response?.data?.message || '';

        setResponse({ success: status, message });
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e?.response);
        const message =
          e?.response?.data?.message || 'Por favor, fale com suporte.';
        setResponse({
          success: false,
          message,
        });
        setIsLoading(false);
      });
  };

  const handleError = (
    index: keyof RegisterData,
    isInvalid: boolean,
    newMessage?: string,
  ) => {
    if (isInvalid) setHasError(true);
    setDataError((prev) => {
      const message = newMessage || prev[index].message;
      return {
        ...prev,
        [index]: { isInvalid, message },
      };
    });
  };

  const nextStep = () => {
    let hasErrorTmp: boolean = false;

    if (step === 1) {
      if (validateMinLength(dataForm.name, 8)) {
        hasErrorTmp = true;
        handleError('name', true);
      }

      if (!validateEmail(dataForm.email)) {
        hasErrorTmp = true;
        handleError('email', true);
      }

      if (validateMinLength(dataForm.password, 8)) {
        hasErrorTmp = true;
        handleError('password', true);
      }
    }

    if (step === 2) {
      //if (validateMinLength(dataForm.name, 3)) handleError('name', true);
      if (!validateEqualLength(dataForm.birthdate, 10)) {
        hasErrorTmp = true;
        handleError('birthdate', true);
      }
      if (!validateEqualLength(dataForm.phoneNumber, 15)) {
        hasErrorTmp = true;
        handleError('phoneNumber', true);
      }
    }

    if (step === 3) {
      if (validateMinLength(dataForm.nickName, 3)) {
        hasErrorTmp = true;
        handleError('nickName', true);
      }
    }

    const nextStep: number = step + 1;
    if (!hasErrorTmp) setStep(nextStep);
    if (!hasErrorTmp && nextStep === 4) handleSubmit();
  };

  useEffect(() => {
    if (response.success) {
      navigation.navigate('EventsPage');
    }
  }, [response]);

  const selectPhoto = () => {
    Permissions.getCameraPermission()
      .then((result) => {
        if (result === true) {
          const options: ImagePickerOptions = {
            title: 'Selecione sua foto de perfil',
            cameraType: 'front',
            mediaType: 'photo',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };

          ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              //TODO(Jeconias) Solve it.
              console.log('Cancelled');
            } else if (response.error) {
              //TODO(Jeconias) Solve it.
              console.log('ImagePicker Error: ', response.error);
            } else {
              console.log(response.uri);
              setDataForm((prev) => ({
                ...prev,
                avatar: response.uri,
              }));
            }
          });
        }
      })
      .catch((e) => {
        //TODO(Jeconias) Solve it.
        console.log(e);
      });
  };

  return (
    <ImageBackground
      blurRadius={2}
      source={require('../../assets/images/backgrounds/loginPage.jpg')}>
      <ContainerCenterSB>
        <StepDot total={3} lastDotWithoutBar={true} currentStep={step - 1} />
        <Close onPress={() => navigation.navigate('LoginPage')} />
        {step !== 1 && <ToBack onPress={() => setStep((prev) => prev - 1)} />}
        {isLoading && <Loading message="Registrando a conta" />}
        {step === 4 && !response.success && !isLoading && (
          <Feedback
            title="Ops, tivemos um problema!"
            message={response.message}
          />
        )}
        <View>
          <TitleCenter>Create Account</TitleCenter>
        </View>
        <Full>
          <View>
            {step === 1 && (
              <View>
                <Input
                  iconName="user"
                  placeholder="Full Name"
                  maxLength={50}
                  value={dataForm.name}
                  onChangeText={(e: string) => handleChange(e, 'name')}
                  errorIsInvalid={dataError.name.isInvalid}
                  errorMessage={dataError.name.message}
                />
                <Input
                  iconName="envelope"
                  keyboardType="email-address"
                  placeholder="Email"
                  maxLength={50}
                  value={dataForm.email}
                  onChangeText={(e: string) => handleChange(e, 'email')}
                  errorIsInvalid={dataError.email.isInvalid}
                  errorMessage={dataError.email.message}
                />
                <Input
                  iconName="lock"
                  secureTextEntry={true}
                  placeholder="Password"
                  maxLength={15}
                  value={dataForm.password}
                  onChangeText={(e: string) => handleChange(e, 'password')}
                  errorIsInvalid={dataError.password.isInvalid}
                  errorMessage={dataError.password.message}
                />
              </View>
            )}
            {step === 2 && (
              <View>
                <Select
                  iconName="people"
                  onChange={(e: string) => handleChange(e, 'userType')}
                  value={dataForm.userType}
                  title="Select your profile">
                  <Picker.Item label="Musician" value="musician" />
                  <Picker.Item label="Promoter" value="promoter" />
                </Select>
                <Input
                  iconName="calendar"
                  errorIsInvalid={dataError.birthdate.isInvalid}
                  errorMessage={dataError.birthdate.message}>
                  <TextInputMask
                    keyboardType="numeric"
                    placeholder="Birthdate"
                    type="datetime"
                    value={dataForm.birthdate}
                    maxLength={10}
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                    onChangeText={(e: string) => handleChange(e, 'birthdate')}
                  />
                </Input>
                <Input
                  iconName="phone"
                  errorIsInvalid={dataError.phoneNumber.isInvalid}
                  errorMessage={dataError.phoneNumber.message}>
                  <TextInputMask
                    keyboardType="numeric"
                    placeholder="Phone"
                    type="cel-phone"
                    value={dataForm.phoneNumber}
                    maxLength={15}
                    onChangeText={(e: string) => handleChange(e, 'phoneNumber')}
                  />
                </Input>
              </View>
            )}
            {step === 3 && (
              <View>
                <Profile
                  source={dataForm.avatar}
                  onPress={() => selectPhoto()}
                />
                <Input
                  iconName="user"
                  placeholder="NickName"
                  value={dataForm.nickName}
                  maxLength={15}
                  onChangeText={(e: string) => handleChange(e, 'nickName')}
                  errorIsInvalid={dataError.nickName.isInvalid}
                  errorMessage={dataError.nickName.message}
                />
              </View>
            )}
            {step !== 4 && (
              <Button onPress={() => nextStep()}>
                {step !== 3 ? 'Next' : 'Register'}
              </Button>
            )}
          </View>
          <AccountContainer>
            <TouchableOpacity>
              <Terms>Terms & Conditions</Terms>
            </TouchableOpacity>
          </AccountContainer>
        </Full>
      </ContainerCenterSB>
    </ImageBackground>
  );
};

export default RegisterPage;

const Button = styled(BaseButton)`
  margin-top: 25px;
  margin-bottom: 45px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const AccountContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  padding-bottom: 20px;
`;

const Terms = styled(BaseText)`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${({ theme }) => theme.fontsSize.sm};
`;

const Full = styled(View)`
  width: 100%;
`;
