There are changes in react-native-create-thumbnail, that would solve the build error
In the following file
spill-master\node_modules\react-native-create-thumbnail\android\src\main\java\com\createthumbnail\CreateThumbnailModule.java

CHANGE:
retriever.release();

TO:
try {
    retriever.release();
} catch (IOException ex) {
    // handle the exception here
}