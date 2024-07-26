import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import images from '../../Constants/images';
import {COLORS} from '../../Constants/theme';
import CustomText from '../../Components/Text';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import ShowToast from '../../GlobalFunctions/ShowToast';
import auth from '@react-native-firebase/auth';
// import { appleAuth } from '@invertase/react-native-apple-authentication';

const GoThrough = ({ navigation }) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Platform.OS === 'ios' 
      ? '1062821622342-s61pfalves38n99havri66pd7eao3kon.apps.googleusercontent.com' // iOS Web Client ID
      : '386029052031-1ni6hqf4ipblq0b5djghrh9rlmqr5i4b.apps.googleusercontent.com', // Android Web Client ID
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      profileImageSize: 120,
    });
  }, []);

  const handleGoogleAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userDetails = await GoogleSignin.signIn();
      console.log(userDetails.user);
      ShowToast('success', 'Login Successful');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cancelled',error.message);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('in progress',error.message);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available',error.message);
      } else {
        console.log(error.message)
        ShowToast('error', error.message);
      }
    }
  };

  const handleFacebookAuth = async () => {
    try {
        // Log out if there's an active session
        LoginManager.logOut();

        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

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
        
        // Fetch user information from Facebook
        const response = await fetch(`https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${token}`);

        if (!response.ok) {
            const errorText = await response.text(); // Capture error message
            throw new Error(`Failed to fetch user information from Facebook: ${errorText}`);
        }

        const userInfo = await response.json();
        const { id, first_name, last_name, email } = userInfo;

        console.log('User Info:', { id, first_name, last_name, email });

        // Create a Firebase credential with the Access Token
        const facebookCredential = auth.FacebookAuthProvider.credential(token);

        console.log('Facebook Credential:', facebookCredential);

        // Sign-in the user with the credential
        const firebaseUserCredential = await auth().signInWithCredential(facebookCredential);

        console.log('Firebase User Credential:', firebaseUserCredential);

        return firebaseUserCredential;
    } catch (error) {
        console.error('Facebook Auth Error:', error);
        throw error;  // Re-throw the error if needed
    }
};



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
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <Image
          source={images.AuthBackground}
          resizeMode="cover"
          style={{ height: '55%', width: '100%' }}
        />
        <View style={{ marginHorizontal: 35 }}>
          <TouchableOpacity
          // onPress={()=>handleAppleAuth()}
            style={[
              styles.container,
              { marginTop: 25, backgroundColor: 'black' },
            ]}>
            <Image source={images.apple_icon} style={{ marginRight: 20 }} />
            <CustomText style={styles.txt} text={'Continue with Apple'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGoogleAuth}
            style={[styles.container, {}]}>
            <Image source={images.Google_Icon} style={{ marginRight: 20 }} />
            <CustomText
              style={[styles.txt, { color: 'black' }]}
              text={'Continue with Google'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFacebookAuth}
            style={[styles.container, { backgroundColor: '#1878F3' }]}>
            <Image source={images.Facebook_Logo} style={{ marginRight: 20 }} />
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
              { marginTop: 30, backgroundColor: '#376CE3' },
            ]}>
            <CustomText style={styles.txt} text={'Get Started'} />
          </TouchableOpacity>
        </View>
      </View>
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
