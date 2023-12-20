import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../Constants/theme';
import AnimatedLottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import InputField from '../../Components/InputField';
import ChatHeader from '../../Components/ChatHeader';
import Modal from 'react-native-modal';
import {createThumbnail} from 'react-native-create-thumbnail';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';

const ChatScreen = ({navigation, route}) => {
  const [messageText, setMessageText] = useState('');
  const [pickedImage, setPickedImage] = useState('');
  const [pickedVideo, setPickedVideo] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [messages, setMessages] = useState([]);
  const [readByIds, setReadByIds] = useState([]);
  const [typing, setTyping] = useState(false);
  const [messageSendingLoading, setMessageSendingLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [deletedFor, setDeletedFor] = useState({});
  const [blockedBy, setBlockedBy] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const {data} = useSelector(state => state.authData);
  const otherUserId = route.params?.otherUserId;
  const {userData, navigatedFrom} = route.params;


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  
  const renderMessages = ({item, index}) => {
    if (item.messageTime >= deletedFor[data.id]) {
      return (
        <View key={index} style={styles.messageContainer}>
          <View
            style={[
              styles.message,
              item.senderId === data.id
                ? styles.messageByMe
                : styles.messageByOther,
            ]}>
            {item.imageUrl ? (
              <FastImage
                source={{uri: item.imageUrl}}
                style={styles.messageImage}
              />
            ) : null}

            {item.videoUrl ? (
              <TouchableOpacity
                //   onPress={() =>
                //     navigation.navigate('VideoPlayer', {url: item.videoUrl})
                //   }
                style={styles.videoContainer}>
                <FastImage
                  source={{uri: item.thumbnailUrl}}
                  style={styles.messageImage}
                />
                <Entypo
                  name="controller-play"
                  color="black"
                  size={55}
                  style={styles.playButton}
                />
              </TouchableOpacity>
            ) : null}

            <Text style={styles.messageText}>{item.messageText}</Text>
            <Text style={styles.time}>
              {new Date(item.messageTime).toLocaleString()}
            </Text>
          </View>

          {item.senderId === data.id &&
            index === 0 &&
            readByIds.includes(otherUserId) && (
              <Text style={styles.seenMessage}>seen</Text>
            )}

          {item.senderId === data.id &&
            index === 0 &&
            !readByIds.includes(otherUserId) && (
              <Text style={styles.seenMessage}>sent</Text>
            )}
        </View>
      );
    }
  };

  const pickVideo = () => {
    setPickedImage('');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'video',
    }).then(video => {
      setModalVisible(false);
      setPickedVideo(video);
      createThumbnail({
        url: video.path,
        timeStamp: 10000,
      })
        .then(response => setThumbnail(response))
        .catch(err => console.log({err}));
    });
  };

  const pickImage = () => {
    setPickedVideo('');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      setModalVisible(false);
      setPickedImage(image);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatHeaderContainer}>
        <ChatHeader
          // blocked={blockedBy.includes(data.id) ? true : false}
          blocked={false}
          onUnblockPress={() => console.log('unblocked')}
          onBlockPress={() => console.log('blocked')}
          onDeletePress={() => console.log('deleted')}
          onBackPress={() => navigation.goBack()}
          userData={userData}
        />
      </View>
      <View style={styles.messagesContainer}>
        <FlatList data={messages} renderItem={renderMessages} inverted={true} />
        {typing === otherUserId ? (
          <View style={styles.lottieCont}>
            <AnimatedLottieView
              source={require('../../Assets/lottie/typing-lottie.json')}
              autoPlay
              loop
            />
          </View>
        ) : null}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.messageInputContainer}>
          <View style={{width: '70%', borderRadius: 50}}>
            {pickedImage.path ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Entypo
                  onPress={() => setPickedImage('')}
                  name="circle-with-cross"
                  color={'black'}
                  size={25}
                  style={styles.crossIcon}
                />
                <FastImage
                  source={{uri: pickedImage.path}}
                  style={styles.image}
                />
              </View>
            ) : null}
            {pickedVideo.path ? (
              <TouchableOpacity
                //   onPress={() =>
                //     navigation.navigate('VideoPlayer', {url: pickedVideo.path})
                //   }
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Entypo
                  onPress={() => [setPickedVideo(''), setThumbnail('')]}
                  name="circle-with-cross"
                  color={'black'}
                  size={25}
                  style={styles.crossIcon}
                />
                <FastImage
                  source={{uri: thumbnail.path}}
                  style={styles.image}
                />
                <Entypo
                  name="controller-play"
                  color="black"
                  size={55}
                  style={{position: 'absolute'}}
                />
              </TouchableOpacity>
            ) : null}

            <InputField
              placeholder={'Write your message'}
              value={messageText}
              onChangeText={changedText => setMessageText(changedText)}
              style={styles.messageInput}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setModalVisible(true)}
            style={styles.attachmentBtn}>
            <Entypo name="attachment" size={25} color={'grey'} />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={messageSendingLoading}
            activeOpacity={0.6}
            //   onPress={onSend}
            style={styles.sendBtn}>
            {messageSendingLoading ? (
              <ActivityIndicator color={'black'} size={hp('3.5%')} />
            ) : (
              <Feather name="send" size={25} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>
        {Platform.OS === 'ios' && isKeyboardVisible ? <View style={{height: 60}} /> : null}
      </KeyboardAvoidingView>

      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}>
        <View style={styles.modal}>
          <Entypo
            onPress={() => setModalVisible(false)}
            name="circle-with-cross"
            color={'black'}
            size={25}
            style={styles.cross}
          />
          <TouchableOpacity
          // onPress={pickImage}
          >
            <Text style={styles.option}>Upload a photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={pickVideo}
          >
            <Text style={styles.option}>Upload a video</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  cross: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  crossIcon: {
    position: 'absolute',
    top: 25,
    right: 25,
    zIndex: 30,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 30,
  },
  option: {
    padding: 15,
    fontSize: hp('3%'),
    color: 'black',
  },
  image: {
    width: '90%',
    height: hp('40%'),
    backgroundColor: 'lightyellow',
    margin: 10,
    borderRadius: 30,
  },
  messageImage: {
    width: '90%',
    height: hp('40%'),
    backgroundColor: 'lightyellow',
    margin: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headingText: {
    color: 'black',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginLeft: 15,
  },
  chatHeaderContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 30,
  },
  otherUserMessage: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginHorizontal: 25,
    marginTop: 60,
  },
  yourMessage: {
    backgroundColor: COLORS.primary_border,
    padding: 15,
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginHorizontal: 25,
    marginTop: 10,
  },
  messagesContainer: {
    width: '100%',
    paddingTop: hp('8%'),
    flex: 1,
  },
  messageInputContainer: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //   borderWidth: 1,
    borderRadius: 30,
    borderColor: 'lightgrey',
    marginBottom: 6,
    // backgroundColor: 'yellow'
  },
  messageInput: {
    paddingHorizontal: 5,
    width: '100%',
    borderRadius: 30,
    color: 'black',
  },
  attachmentBtn: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    alignSelf: 'flex-end',
  },
  sendBtn: {
    padding: 15,
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.black,
    alignSelf: 'flex-end',
  },
  messageByOther: {
    width: wp('70%'),
    backgroundColor: COLORS.primary_with_opacity,
    borderRadius: 10,
    alignSelf: 'flex-start',
    margin: 10,
  },
  messageByMe: {
    width: wp('70%'),
    backgroundColor: COLORS.primary_with_opacity,
    alignSelf: 'flex-end',
    borderRadius: 15,
    margin: 10,
    borderRadius: 10,
  },
  messageText: {
    fontSize: hp('2.2%'),
    color: 'black',
    padding: 15,
  },
  time: {
    color: 'rgba(0,0,0,0.7)',
    marginLeft: 12,
    marginBottom: 3,
    fontSize: hp('1.7%'),
  },
  lottieCont: {
    width: '20%',
    height: hp('6%'),
    paddingLeft: wp('5%'),
  },
  seenMessage: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: -5,
    marginBottom: 10,
  },
  blockText: {
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: hp('2.2%'),
    color: 'grey',
    marginVertical: 15,
  },
  playButton: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
});
