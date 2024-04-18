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
  Keyboard
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../Constants/theme';
import AnimatedLottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import InputField from '../../Components/InputField';
import ChatHeader from '../../Components/ChatHeader';
import Modal from 'react-native-modal';
import {createThumbnail} from 'react-native-create-thumbnail';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import FastImage from 'react-native-fast-image';

const ChatScreen = ({navigation, route}) => {
  const [messageText, setMessageText] = useState('');
  const [pickedImage, setPickedImage] = useState('');
  const [pickedVideo, setPickedVideo] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatExists, setChatExists] = useState(false);
  const [currentChatId, setCurrentChatId] = useState('');
  const [readByIds, setReadByIds] = useState([]);
  const [typing, setTyping] = useState(false);
  const [messageSendingLoading, setMessageSendingLoading] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [deletedFor, setDeletedFor] = useState({});
  const [blockedBy, setBlockedBy] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  const {user} = useSelector(state => state.authData);
  const otherUserId = route.params?.otherUserId;
  const {
    userData,
  } = route.params;

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

  useEffect(() => {
    if (!messageText) {
      database().ref(`/chats/${currentChatId}`).update({
        typing: false
      })
    } else if (messageText.length === 1) {
      database().ref(`/chats/${currentChatId}`).update({
        typing: user.id
      })
    }
  }, [messageText]);

  useEffect(() => {
    database().ref(`/chats/${user.id}_${otherUserId}`).on('value', (snapshot) => {
      if(snapshot.exists()){
        const data = snapshot.val()
        setCurrentChatId(`${user.id}_${otherUserId}`);
        setDeletedFor(data.deletedFor);
        setChatExists(true);
        setMessages(data.messages);
        setReadByIds(data.readBy);
        setTyping(data.typing);
        setBlockedBy(data?.blockedBy ? data?.blockedBy : [])
      }else {
        database().ref(`/chats/${otherUserId}_${user.id}`).on('value', (snapshot) => {
          if(snapshot.exists()){
            const data = snapshot.val()

            setCurrentChatId(`${otherUserId}_${user.id}`);
            setDeletedFor(data.deletedFor);
            setChatExists(true);
            setMessages(data.messages);
            setReadByIds(data.readBy);
            setTyping(data.typing);
            setBlockedBy(data?.blockedBy ? data?.blockedBy : [])
          }
        })
      }
    })

  }, []);

  // This useEffect checks whether the message is being seen or not
  useEffect(() => {
    messageSeen();
  }, [chatExists, messages]);

  // This function checks whether the readBy array includes data.id and if not, it adds it in that array
  const messageSeen = () => {
    const chatRef = database().ref(`/chats/${currentChatId}`);

    if (chatExists) {
      chatRef.on('value', snapshot => {
        const readByIdsArray = snapshot.val().readBy;

        if (!readByIdsArray.includes(user?.id)) {
          const readByRef = database().ref(`/chats/${currentChatId}/readBy`);
          readByRef.set([...readByIdsArray, user?.id]);
        }
      });
    }
  };

  const renderMessages = ({item, index}) => {
      if(item.messageTime >= deletedFor[user.id]){
        return (
          <View key={index} style={styles.messageContainer}>
            <View style={[
              styles.message,
              item.senderId === user.id ? styles.messageByMe : styles.messageByOther
            ]}>
              {item.imageUrl ? (
                <FastImage
                  source={{uri: item.imageUrl}}
                  style={styles.messageImage}
                />
              ) : null}
      
              {item.videoUrl ? (
                <TouchableOpacity 
                  onPress={() => navigation.navigate('VideoPlayer', {url: item.videoUrl})}
                  style={styles.videoContainer}
                >
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
      
            {item.senderId === user.id && 
              index === 0 &&
              readByIds.includes(otherUserId) && (
                <Text style={styles.seenMessage}>seen</Text>
              )
            }
      
            {item.senderId === user.id && 
              index === 0 &&
              !readByIds.includes(otherUserId) && (
                <Text style={styles.seenMessage}>sent</Text>
              )
            }
          </View>
        );
      }
  };

  const startChat = ({videoUrl = null, imageUrl = null, thumbnailUrl = null} = {}) => {
    database().ref(`/chats/${user.id}_${otherUserId}`).set({
      chatId: `${user.id}_${otherUserId}`,
      ids: [`${user.id}`, `${otherUserId}`],
      lastMessageTime: new Date().getTime(),
      readBy: [user.id],
      lastMessage: {
        text: messageText,
        senderId: user.id,
      },
      deletedFor: {
        [user.id]: new Date().getTime(),
        [otherUserId]: new Date().getTime()
      },
      blockedBy: [],
      messages: [
        {
          messageText: messageText,
          senderId: user.id,
          messageTime: new Date().getTime(),
          imageUrl: imageUrl,
          videoUrl: videoUrl,
          thumbnailUrl: thumbnailUrl
        },
      ],
    })
    .then(() => {
      firestore()
      .collection('users')
      .doc(user.id)
      .get()
      .then(snapshot => {
        const allChats = snapshot.data()?.allChats;
        if(allChats){
          firestore()
            .collection('users')
            .doc(user.id)
            .update({
              allChats: [
                ...allChats ,
                {
                  chatId: `${user.id}_${otherUserId}`,
                  ids: [user.id, otherUserId],
                  createdAt: new Date().getTime(),
                  lastMessage: {
                    text: messageText,
                    senderId: user.id,
                  },
                },
              ],
            }).then(() => console.log("DONE"))
            .catch(err => console.log("Some error with updating --->   ", err))
        }else {
          firestore()
          .collection('users')
          .doc(user.id)
          .update({
            allChats: [
              {
                chatId: `${user.id}_${otherUserId}`,
                ids: [user.id, otherUserId],
                createdAt: new Date().getTime(),
                lastMessage: {
                  text: messageText,
                  senderId: user.id,
                },
              },
            ],
          }).then(() => console.log("DONE"))
          .catch(err => console.log("Some error with updating --->   ", err))
        }
      })
      .catch(err => console.log("HRE IS THE ERRORORORO ---->   ", err))

    firestore()
      .collection('users')
      .doc(otherUserId)
      .get()
      .then(snapshot => {
        const allChats = snapshot.data()?.allChats;
        if(allChats){
          firestore()
            .collection('users')
            .doc(otherUserId)
            .update({
              allChats: [
                ...allChats ,
                {
                  chatId: `${user.id}_${otherUserId}`,
                  ids: [user.id, otherUserId],
                  createdAt: new Date().getTime(),
                  lastMessage: {
                    text: messageText,
                    senderId: user.id,
                  },
                },
              ],
            }).then(() => console.log("DONE"))
            .catch(err => console.log("Some error with updating --->   ", err))
        }else {
          firestore()
          .collection('users')
          .doc(otherUserId)
          .update({
            allChats: [
              {
                chatId: `${user.id}_${otherUserId}`,
                ids: [user.id, otherUserId],
                createdAt: new Date().getTime(),
                lastMessage: {
                  text: messageText,
                  senderId: user.id,
                },
              },
            ],
          }).then(() => console.log("DONE"))
          .catch(err => console.log("Some error with updating --->   ", err))
        }
      })
      .catch(err => console.log("HRE IS THE ERRORORORO ---->   ", err))
      
      
      setMessageSendingLoading(false)
      setPickedImage('');
      setPickedVideo('');
      setMessageText('');
      setThumbnail('');
    })
    .catch(() => {
      setMessageSendingLoading(false)
    })
    
  };


  const sendMessage = async ({ videoUrl = null, imageUrl = null, thumbnailUrl = null } = {}) => {
    try {
      const updatedChat = {
        lastMessageTime: new Date().getTime(),
        readBy: [user.id],
        lastMessage: {
          text: messageText,
          senderId: user.id,
        },
        messages: [
          {
            messageText: messageText,
            senderId: user.id,
            messageTime: new Date().getTime(),
            imageUrl,
            videoUrl,
            thumbnailUrl
          },
          ...messages,
        ],
      };
  
      await database().ref(`/chats/${currentChatId}`).update(updatedChat)

      setMessageSendingLoading(false);
      setPickedImage('');
      setPickedVideo('');
      setMessageText('');
      setThumbnail('');

      await firestore()
      .collection('users')
      .doc(user.id)
      .get()
      .then((snapshot) => {
        const allChats = snapshot.data()?.allChats;
        const currentChat = allChats.filter(eachChat => eachChat.ids.includes(otherUserId))
        const otherChats = allChats.filter(eachChat => !eachChat.ids.includes(otherUserId))


        currentChat[0].createdAt = new Date().getTime()
        currentChat[0].lastMessage = {
          senderId: user.id,
          text: messageText
        }
        firestore()
        .collection('users')
        .doc(user.id)
        .update({
          allChats: [
            ...otherChats,
            ...currentChat
          ]
        })
      });

      await firestore()
      .collection('users')
      .doc(otherUserId)
      .get()
      .then((snapshot) => {
        const allChats = snapshot.data()?.allChats;
        const currentChat = allChats.filter(eachChat => eachChat.ids.includes(user.id))
        const otherChats = allChats.filter(eachChat => !eachChat.ids.includes(user.id))

        currentChat[0].createdAt = new Date().getTime()
        currentChat[0].lastMessage = {
          senderId: user.id,
          text: messageText
        }
        firestore()
        .collection('users')
        .doc(otherUserId)
        .update({
          allChats: [
            ...otherChats,
            ...currentChat
          ]
        })
      });
      
    } catch (error) {
      setMessageSendingLoading(false);
      console.error('Something went wrong while sending message: ----> ', error);
    }
  };

  const onSend = async () => {
    if (!chatExists) {
      // console.log("-------->>>  CHAT EXIST IS FALSE  ", chatExists)
      try {
        if (pickedImage.path) {
          setMessageSendingLoading(true);
          const imageUrl = await uploadFile(pickedImage.path);
          startChat({ imageUrl });
        } else if (pickedVideo.path) {
          setMessageSendingLoading(true);
          const videoUrl = await uploadFile(pickedVideo.path);
          const thumbnailUrl = await uploadFile(thumbnail.path);
          startChat({ videoUrl, thumbnailUrl });
        } else if (messageText) {
          setMessageSendingLoading(true);
          startChat();
        } else {
          Alert.alert("You can not send an empty message");
        }
      } catch (error) {
        console.error(error);
        setMessageSendingLoading(false);
        Alert.alert("Failed to send message. Please try again.");
      }
    } else {
      try {
        if (pickedImage.path) {
          setMessageSendingLoading(true);
          const imageUrl = await uploadFile(pickedImage.path);
          sendMessage({ imageUrl });
        } else if (pickedVideo.path) {
          setMessageSendingLoading(true);
          const videoUrl = await uploadFile(pickedVideo.path);
          const thumbnailUrl = await uploadFile(thumbnail.path);
          sendMessage({ videoUrl, thumbnailUrl });
        } else if (messageText) {
          setMessageSendingLoading(true);
          sendMessage();
        } else {
          Alert.alert("You can not send an empty message");
        }
      } catch (error) {
        console.error(error);
        setMessageSendingLoading(false);
        Alert.alert("Failed to send message. Please try again.");
      }
    }
  };
  
  const uploadFile = async (path) => {
    const randomRef = Math.ceil(Math.random() * 1000000);
    const fileRef = storage().ref(`${randomRef}`);
    await fileRef.putFile(path);
    return fileRef.getDownloadURL();
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

  
  const onBlockPress = () => {
    database().ref(`/chats/${currentChatId}`).update({
      blockedBy: [...blockedBy, user.id]
    })
    .then(() => {
      console.log('User Blocked Successfully')
    })
    .catch(err => console.log(err))
  }
  const onUnblockPress = () => {
    database().ref(`/chats/${currentChatId}`).update({
      blockedBy: blockedBy.filter(each => each !== user.id)
    })
    .then(() => {
      console.log('User Blocked Successfully')
    })
    .catch(err => console.log(err))
  }
  
  const onDeletePress = () => {
    database().ref(`/chats/${currentChatId}`).update({
      deletedFor: {
        [otherUserId]: deletedFor[otherUserId],
        [user.id]:  new Date().getTime()
      },
      lastMessage: {
        text: ''
      }
    })
    .then(() => {
      console.log('chat deleted successfully')
    })
    .catch(err => console.log(err))
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >
      <View style={styles.chatHeaderContainer}>
        <ChatHeader
          blocked={blockedBy?.includes(user.id) ? true : false}
          onUnblockPress={onUnblockPress}
          onBlockPress={onBlockPress}
          onDeletePress={onDeletePress}
          onBackPress={() => navigation.goBack()}
          userData={userData}
        />
      </View>
      <View style={styles.messagesContainer}>
        <FlatList data={messages} renderItem={renderMessages} inverted={true} contentContainerStyle={{paddingBottom: 50}} />
        {typing === otherUserId ? (
          <View style={styles.lottieCont}>
            <AnimatedLottieView
              source={require('../../Assets/lottie/typing-lottie.json')}
              autoPlay
              loop
              style={{width: 100, height: 100}}
            />
          </View>
        ) : null}
      </View>
      {
        blockedBy?.includes(user.id) ? <Text style={styles.blockText}>You have blocked this user</Text> : blockedBy.includes(otherUserId) ? <Text style={styles.blockText}>You have been blocked</Text> : (
          <View style={[styles.messageInputContainer, isKeyboardVisible ? {marginBottom: 70} : null]}>
            <View style={{width: '70%', borderRadius: 50}}>
              {pickedImage.path ? (
                <View style={{justifyContent:'center', alignItems: 'center'}}>
                  <View style={styles.crossIcon}>
                    <Entypo
                      onPress={() => setPickedImage('')}
                      name="circle-with-cross"
                      color={'black'}
                      size={25}
                      // style={styles.crossIcon}
                    />
                  </View>
                  <FastImage
                    source={{uri: pickedImage.path}}
                    style={styles.image}
                  />
                </View>
              ) : null}
              {pickedVideo.path ? (
                <TouchableOpacity onPress={() => navigation.navigate('VideoPlayer', {url: pickedVideo.path})} style={{justifyContent:'center', alignItems: 'center'}}>
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
                  <Entypo name='controller-play' color='black' size={55} style={{position: 'absolute'}} /> 
                </TouchableOpacity>
              ) : null}
              <InputField
                placeholder={'Write your message'}
                value={messageText}
                onChangeText={changedText => setMessageText(changedText)}
                // placeholderColor="grey"
                // style={styles.messageInput}
                containerStyle={styles.messageInput}
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
              onPress={onSend}
              style={styles.sendBtn}>
                {messageSendingLoading ? <ActivityIndicator color={'black'} size={hp('3.5%')} /> : <Feather name="send" size={25} color={COLORS.primary} />}
            </TouchableOpacity>
          </View>
        )
      }
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
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.option}>Upload a photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickVideo}>
            <Text style={styles.option}>Upload a video</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
    backgroundColor:'white',
    padding: 5,
    borderRadius: 30
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
    top: 10,
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
    backgroundColor: COLORS.secondary_with_opacity,
    padding: 15,
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginHorizontal: 25,
    marginTop: 10,
  },
  messagesContainer: {
    width: '100%',
    paddingTop: hp('7%'),
    flex: 1,
  },
  messageInputContainer: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'lightgrey',
    marginBottom: 6,
  },
  messageInput: {
    width: '100%',
    borderRadius: 30,
    color: 'black',
    marginTop: 0
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
    backgroundColor: 'lightgrey',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  messageByOther: {
    width: wp('70%'),
    backgroundColor: COLORS.primary,
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
    borderRadius: 10
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
    height: hp('5%'),
    paddingLeft: wp('5%'),
    marginBottom: 30
  },
  seenMessage: {
    alignSelf:'flex-end',
    marginRight: 20,
    marginTop: -5,
    marginBottom: 10
  },
  blockText: {
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: hp('2.2%'),
    color: 'grey',
    marginVertical: 15
  }
});
