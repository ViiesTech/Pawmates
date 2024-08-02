import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../Constants/images';
import {COLORS} from '../../Constants/theme';
import CustomText from '../../Components/Text';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import ShowToast from '../../GlobalFunctions/ShowToast';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import {SocialAuth} from '../../GlobalFunctions/SocialAuth';
import {useDispatch} from 'react-redux';
import {setToken, SignIn} from '../../Redux/authSlice';
// import { appleAuth } from '@invertase/react-native-apple-authentication';

const GoThrough = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authType, setAuthType] = useState();
  const [userType, setUserType] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS === 'ios'
          ? '1062821622342-s61pfalves38n99havri66pd7eao3kon.apps.googleusercontent.com' // iOS Web Client ID
          : '386029052031-1ni6hqf4ipblq0b5djghrh9rlmqr5i4b.apps.googleusercontent.com', // Android Web Client ID
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      profileImageSize: 120,
    });
  }, []);
  const handleUserType = (auth) => {
    setAuthType(auth);
    setModalVisible(true);
  };
  const handleGoogleAuth = async () => {
    try {
      setGoogleLoading(true);

      await GoogleSignin.hasPlayServices();

      const userDetails = await GoogleSignin.signIn();
      console.log('userDetails', userDetails.user);
      const response = await SocialAuth(
        userDetails.user.name,
        userDetails.user.email,
        userType,
        userDetails.user.photo,
      );
      setGoogleLoading(false);
      if (!response.success) {
        ShowToast('error', response.message);
      } else {
        dispatch(SignIn(response.data));
        dispatch(setToken(response.data.token));
      }
    } catch (error) {
      setGoogleLoading(false);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign-in cancelled:', error.message);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in in progress:', error.message);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available:', error.message);
      } else {
        console.log('Sign-in error:', error.message);
        ShowToast('error', error.message);
      }
    } finally {
      setGoogleLoading(false);

      setModalVisible(false);
    }
  };

  const handleFacebookAuth = async () => {
    try {
      // Log out if there's an active session
      LoginManager.logOut();

      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }

      // Get the Access Token
      const data = await AccessToken.getCurrentAccessToken();
      console.log('Access Token Data:', data);

      if (!data) {
        throw new Error('Failed to obtain access token');
      }

      const token = data.accessToken;
      console.log('Access Token:', token);

      // Fetch user details using the Graph API
      const userDetails = await fetchFacebookUserDetails(token);
      console.log('User Details:', userDetails);

      return userDetails;
    } catch (error) {
      console.error('Facebook Auth Error:', error);
      throw error; // Re-throw the error if needed
    }
  };

  const fetchFacebookUserDetails = async accessToken => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`,
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching user details: ${response.status} ${response.statusText}`,
        );
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching Facebook user details:', error);
      throw error;
    }
  };
  // https://graph.facebook.com/me?fields=id,name,email&access_token=YOUR_ACCESS_TOKEN

  // const handleAppleAuth = async () => {
  //   try {
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  //     });

  //     // Ensure Apple returned a user identityToken
  //     if (!appleAuthRequestResponse.identityToken) {
  //       throw new Error('Apple Sign-In failed - no identity token returned');
  //     }

  //     // Create a Firebase credential from the response
  //     const { identityToken, nonce } = appleAuthRequestResponse;
  //     const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

  //     // Sign the user in with the credential
  //     const firebaseUserCredential = await auth().signInWithCredential(appleCredential);
  //     console.log('Firebase User Credential:', firebaseUserCredential);

  //     ShowToast('success', 'Login Successful');
  //     return firebaseUserCredential;
  //   } catch (error) {
  //     console.error('Apple Auth Error:', error);
  //     ShowToast('error', error.message);
  //     throw error;  // Re-throw the error if needed
  //   }
  // };
  console.log(userType);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View>
        <Image
          source={images.AuthBackground}
          resizeMode="cover"
          style={{height: '55%', width: '100%'}}
        />
        <View style={{marginHorizontal: 35}}>
          <TouchableOpacity
            // onPress={()=>handleAppleAuth()}
            style={[
              styles.container,
              {marginTop: 25, backgroundColor: 'black'},
            ]}>
            <Image source={images.apple_icon} style={{marginRight: 20}} />
            <CustomText style={styles.txt} text={'Continue with Apple'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>handleUserType('google')}
            style={[styles.container, {}]}>
            {googleLoading ? (
              <ActivityIndicator size={'large'} color={'black'} />
            ) : (
              <View style={[styles.container, {}]}>
                <Image source={images.Google_Icon} style={{marginRight: 20}} />
                <CustomText
                  style={[styles.txt, {color: 'black'}]}
                  text={'Continue with Google'}
                />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>handleUserType('facebook')}
            style={[styles.container, {backgroundColor: '#1878F3'}]}>
            <Image source={images.Facebook_Logo} style={{marginRight: 20}} />
            <CustomText style={styles.txt} text={'Continue with Facebook'} />
          </TouchableOpacity>
          <CustomText
            text={
              'By registering, you agree to our Terms of Service, Privacy Policy and Cookie Policy'
            }
            style={styles.policyTxt}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[
              styles.container,
              {marginTop: 30, backgroundColor: '#376CE3'},
            ]}>
            <CustomText style={styles.txt} text={'Get Started'} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        style={{margin: 0}}
        backdropOpacity={0}
        onBackdropPress={() => setModalVisible(false)}
        isVisible={modalVisible}>
        <View
          style={{
            backgroundColor: 'black',
            // height: 200,
            justifyContent: 'center',
            width: 350,
            margin: 0,
            alignSelf: 'center',
            borderRadius: 10,
            padding: 20,
            gap: 20,
          }}>
          <TouchableOpacity
            onPress={() => setUserType('pet owner')}
            style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <TouchableOpacity
              onPress={() => setUserType('pet owner')}
              style={{
                height: 20,
                width: 20,
                borderRadius: 3,
                backgroundColor: 'white',
                justifyContent: 'center',
              }}>
              {userType === 'pet owner' ? (
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 3,
                    backgroundColor: 'black',
                    alignSelf: 'center',
                  }}></View>
              ) : null}
            </TouchableOpacity>
            <View>
              <Text style={{color: 'white'}}>Pet Owner</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType('pet sitter')}
            style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <TouchableOpacity
              onPress={() => setUserType('pet sitter')}
              style={{
                height: 20,
                width: 20,
                borderRadius: 3,
                backgroundColor: 'white',
                justifyContent: 'center',
              }}>
              {userType === 'pet sitter' ? (
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 3,
                    backgroundColor: 'black',
                    alignSelf: 'center',
                  }}></View>
              ) : null}
            </TouchableOpacity>
            <View>
              <Text style={{color: 'white'}}>Pet Seller</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
  style={{
    backgroundColor: 'white',
    height: 45,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  onPress={() => {
    // Call the appropriate authentication function based on authType
    authType === 'facebook' ? handleFacebookAuth() : handleGoogleAuth();
  }}
>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default GoThrough;

const styles = StyleSheet.create({
  App_title_txt: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  title_txt: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 15,
  },
  container: {
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 10,
    flexDirection: 'row',
  },
  txt: {
    color: 'white',
  },
  container_Email: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 15,
    alignContent: 'center',
    flexDirection: 'row',
  },
  devider_View: {
    height: 2,
    backgroundColor: '#D4D4D4',
    marginTop: 30,
    borderRadius: 10,
  },
  policyTxt: {
    fontSize: 11,
    marginTop: 10,
  },
});
