/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import {
  View,
  ScrollView,
  Image,
  Keyboard,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  withTheme,
  Title,
  Button,
  ActivityIndicator,
  Portal,
  Modal,
  Dialog,
  Divider,
  Surface,
  Text,
  FAB,
  TouchableRipple,
  Searchbar,
  Appbar,
  Badge,
  Card,
  Avatar,
  IconButton,
  Snackbar,
  ProgressBar,
  HelperText,
} from 'react-native-paper';
import ytdl from 'react-native-ytdl';
import css from '../Styles/Styles';
import { appRed, appLightRed } from '../Styles/Styles';
import { API_KEY } from '../env';
import 'react-native-gesture-handler';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import * as Animatable from 'react-native-animatable';
import RNFetchBlob from 'rn-fetch-blob';
import Clipboard from '@react-native-clipboard/clipboard';
import YoutubePlayer from 'react-native-youtube-iframe';

//------------ Globals --------------|
var typeError = '';
const android = RNFetchBlob.android;
//-----------------------------------|

class ListVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnLoadMore: true,

      videoList: this.props.route.params.videoList,
      tokenNext: this.props.route.params.tokenNext,
      keywordTxt: this.props.route.params.keywordTxt,
      link_YT: '',
      loading: false,
      moreFormats: false,
      showSearch: false,
      showItem: false,
      videoDetails: '',
      videoId: '',
      videoImg: '',
      videoTitle: '',
      videoReps: '',
      videoAvatar: '',
      videoAutor: '',
      videoLikes: '',
      videoDate: '2021-01-01T04:20:00Z',
      videoDesc: '',
      videoSubs: '',
      videoSize: '',
      videowithAudio: [],
      audioonly: [],
      song: [],
      launchItemView: false,
      isIndet: false,
      downloadProgress: 0,
      progressModal: false,
      hideProgressModal: false,
      colorLine: '#2BBD60',
      showSnack: false,
      status: 'Descargando...',
      filePath: '',
      typeU: '',
      showPaste: false,
      isMP3: '',
      disabledPlay: true,
      disabledClose: true,
      showError: false,
      openPlayer: false,
    };
  }

  requestPermissions = async (item, type) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permisos de Descarga',
          message:
            'Los permisos le permiten descargar música y videos de ésta aplicación.',
          buttonPositive: 'Ok',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use storage');
        this._fileDestiny(item, type);
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  androidProcess = () => {
    this.setState({
      isIndet: true,
      downloadProgress: 0,
    });
  }

  openFile = () => {
    let xpath = this.state.filePath;
    if (Platform.OS === 'ios') {
      //console.log('PRESS OPEN IOS');
      RNFetchBlob.ios.openDocument(xpath);
    }
    if (Platform.OS === 'android') {
      //console.log('PRESS OPEN ANDROID');
      this.state.isMP3 === true ? android.actionViewIntent(xpath, 'audio/mp3') : android.actionViewIntent(xpath, 'video/mp4');
    }
  }

  _downloadExecute = (item, type) => {
    this.setState({ launchItemView: false, progressModal: true, moreFormats: false, typeU: type });
    this.setState({ videoSize: item.contentLength }); //Globals Props

    Platform.OS === 'ios' ? this._fileDestiny(item, type) : this.requestPermissions(item, type);
  }

  _fileDestiny = (item, type) => {
    if (type === 'mp4') { this.downloadMP4(item, type); }
    else if (type === 'mp3') { this.downloadMP3(item, type); }
    else { null; }
  }

  downloadMP4 = async (item) => {
    const { dirs } = RNFetchBlob.fs;
    const { videoTitle } = this.state;
    const videoType = 'mp4';
    const videoMime = 'video/mp4';

    const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    //console.log(dirToSave, '<< Document Path');
    let filePath = `${dirToSave}/${videoTitle}.${videoType}`;
    //console.log(filePath, '<< File Path');
    this.setState({ filePath: filePath });

    Platform.OS === 'android' ? this.androidProcess() : null;

    RNFetchBlob.config(
      Platform.select({
        ios: {
          fileCache: true,
          title: videoTitle, // 1
          path: filePath,
          //appendExt: videoType,
        },
        android: {
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            title: videoTitle, // 1
            description: videoType,
            path: filePath,
            fileCache: true,
            mime: videoMime,
          },
        },
      }))
      .fetch('GET', item.url)
      .progress((received, total) => {
        //console.log('progress', received / total);
        this.setState({ downloadProgress: received / total });
      })
      .then(resp => {
        //console.log('Response: ', resp);
        //console.log('The file saved to', resp.path());
        this.completedDownload();
      })
      .catch((e) => {
        console.log('Error >>', e.message);
        this.cancelDownload();
      });
  };

  downloadMP3 = async (item) => {
    const { dirs } = RNFetchBlob.fs;
    const { videoTitle } = this.state;
    const videoType = 'mp3';  // IMPORTANTE IOS
    const videoMime = 'audio/mp4';

    const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    //console.log(dirToSave, '<< Document Path');
    let filePath = `${dirToSave}/${videoTitle}.${videoType}`;
    //console.log(filePath, '<< File Path');
    this.setState({ filePath: filePath });
    Platform.OS === 'android' ? this.androidProcess() : null;

    RNFetchBlob.config(
      Platform.select({
        ios: {
          fileCache: true,
          title: videoTitle, // 1
          path: filePath,
          //appendExt: videoType,
        },
        android: {
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            title: videoTitle, // 1
            description: videoType,
            path: filePath,
            fileCache: true,
            mime: videoMime,
          },
        },
      }))
      .fetch('GET', item.url)
      .progress((received, total) => {
        //console.log('progress', received / total);
        this.setState({ downloadProgress: received / total });
      })
      .then(resp => {
        //console.log('Response: ', resp);
        //console.log('The file saved to', resp.path());
        this.completedDownload();
      })
      .catch((e) => {
        //console.log('Error >>', e.message);
        this.cancelDownload();
      });
  };

  completedDownload = () => {
    this.setState({
      isIndet: false,
      status: 'COMPLETADA',
      colorLine: '#2BBD60',
      downloadProgress: 1,
      disabledPlay: false,
      disabledClose: false,
      showSnack: true,
    });
  }

  cancelDownload = () => {
    this.setState({ isIndet: false,
      status: 'CANCELADA',
      colorLine: 'red',
      downloadProgress: 0,
      disabledPlay: true,
      disabledClose: false,
      showSnack: false,
    });
  }

  closeProgress = () => {
    //Reset Values
    this.setState({ progressModal: false, isIndet: false });
    this._resetProps();
  }

  _resetProps = () => {
    setTimeout(() => {
      this.setState({ status: 'Descargando...', colorLine: '#2BBD60', downloadProgress: 0, disabledPlay: true, showSnack: false });
    }, 1000);
  }

  scraperFormat = info => {
    let videowithAudio = ytdl.filterFormats(info.formats, 'audioandvideo');
    let audioonly = ytdl.filterFormats(info.formats, 'audioonly');
    //let song = audioonly.filter(audio => audio.audioBitrate === 64).map((audio) => audio);
    let song = audioonly.filter(audio => audio.container === 'mp4').map((audio) => audio); //IMPORTANT

    //console.log('videowithAudio', videowithAudio, '\n', 'audioonly', audioonly);
    //console.log('audioonly', audioonly);
    //console.log('song', song);

    this.setState({
      videowithAudio: videowithAudio,
      audioonly: audioonly,
      song: song,
      loading: false,
    });
  };

  scraperInfo = async yt_id => {
    ytdl.getInfo(yt_id)
      .then(resp => {
        //console.log('INFO found! > ', resp);

        var sizeV = resp.videoDetails.thumbnails.length;
        let videoLikes = this.numberWithCommas(resp.videoDetails.likes);
        let videoReps = this.numberWithCommas(resp.videoDetails.viewCount);
        let videoSubs = this.numberWithCommas(resp.videoDetails.author.subscriber_count);

        this.setState({
          videoDetails: resp.videoDetails,
          videoId: resp.videoDetails.videoId,
          videoImg: resp.videoDetails.thumbnails[sizeV - 1].url,
          videoTitle: resp.videoDetails.title,
          videoReps: videoReps,
          videoDate: resp.videoDetails.publishDate,
          videoLikes: videoLikes,
          videoAvatar: resp.videoDetails.author.thumbnails[0].url,
          videoAutor: resp.videoDetails.author.name,
          videoSubs: videoSubs,
        });

        this.scraperFormat(resp);

      })

      .catch((e) => {
        console.log('Error >>', e.message);
        typeError = e.message;
        typeError.includes('No video id found') ? alert('El video seleccionado es inválido, seleccione otro') : null;
        this.setState({ loading: false, launchItemView: false });
      });
  }

  validateTxt = () => {
    Keyboard.dismiss();
    const string = this.state.keywordTxt;
    string === ''
      ? ((this.setState({ showError: true }), typeError = 'El campo de busqueda está vacío'))
      : ((this.setState({ showError: false }), this.quickSearch()));
  }

  analyzeLink = () => {
    const link = this.state.link_YT;
    const linkWeb = 'https://www.youtube.com/watch?v=';
    const linkWeb2 = 'https://youtube.com/watch?v=';
    const linkMobile = 'https://m.youtube.com/watch?v=';
    const linkShort = 'https://youtu.be/';

    var typeLink = '';
    var validLink = '';

    //this.setState({spin: true});
    Keyboard.dismiss();

    link.includes(linkWeb)
      ? (typeLink = 'web')
      : link.includes(linkWeb2)
        ? (typeLink = 'web2')
        : link.includes(linkMobile)
          ? (typeLink = 'mobile')
          : link.includes(linkShort)
            ? (typeLink = 'short')
            : (typeLink = 'invalid');

    if (typeLink === 'web') {
      validLink = this.cutLink(link);
      this._handleItem(validLink);
    }
    if (typeLink === 'web2') {
      validLink = this.cutLink(link);
      this._handleItem(validLink);
    }
    if (typeLink === 'mobile') {
      validLink = this.cutLink(link);
      this._handleItem(validLink);
    }
    if (typeLink === 'short') {
      validLink = this.cutLink(link);
      this._handleItem(validLink);
    }
    if (typeLink === 'invalid') {
      typeError = 'La URL del video es incorrecta o no existe.';
      this.setState({ showError: true });
    }
  };

  quickSearch = () => {
    const apiKey = API_KEY;  //Key
    const { keywordTxt } = this.state;

    fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&pageToken=' + '&q=' + keywordTxt + '&key=' + apiKey)
      .then(response => response.json())
      .then((response) => {
        this.setState({
          videoList: response.items,
        });
      })
      .catch((e) => {
        //Error Network
      });
  }

  searchMore = () => {
    const apiKey = API_KEY;  //Key
    const { keywordTxt, videoList, tokenNext } = this.state;

    fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&pageToken=' + tokenNext + '&q=' + keywordTxt + '&key=' + apiKey)
      .then(response => response.json())
      .then((response) => {
        this.setState({
          videoList: [].concat(videoList, response.items),
          btnLoadMore: false,
        });
      })
      .catch((e) => {
        //Error Network
      });
  }

  cutLink = link => {
    var cuttedLink = '';
    var i = 0;
    var copyCharacter = true;

    while (i < link.length) {
      if (link[i] === '&') {
        copyCharacter = false;
        i = link.length;
      }
      if (copyCharacter !== false) {
        cuttedLink += link[i];
      }
      i += 1;
    }
    return cuttedLink;
  };
  readFromClipboard = async () => {
    const clipboardTxt = await Clipboard.getString();
    this.setState({ link_YT: clipboardTxt });
  };
  numberWithCommas = (num) => { return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
  hideShowMore = () => this.setState({ moreFormats: false });
  hidePlayer = () => this.setState({ openPlayer: false });
  hideModal = () => this.setState({ launchItemView: false });
  onDismissSnackBar = () => this.setState({ showSnack: false });
  _handleSearch = () => this.setState({ showSearch: !this.state.showSearch, showPaste: false });
  _handlePaste = () => this.setState({ showPaste: !this.state.showPaste, showSearch: false });

  _handleItem = (yt_id) => {
    this.setState({ loading: true, launchItemView: true });
    this.scraperInfo(yt_id);
  }

  _handlePlayer = () => this.setState({ openPlayer: true });
  _handleMoreFormats = () => this.setState({ moreFormats: true });

  render() {
    console.log(this.state);
    const { navigation } = this.props;
    const { videoList, keywordTxt, btnLoadMore, loading, showSearch, launchItemView, moreFormats, showPaste, link_YT, showError, videoId, openPlayer } = this.state; //GeneraL State
    const { progressModal, hideProgressModal, downloadProgress, isIndet, colorLine, showSnack, status, disabledPlay, typeU } = this.state;
    const { videoImg, videoTitle, videoReps, videoDate, videoLikes, videoAvatar, videoAutor, videoSubs, videoSize } = this.state; //Video Details Props Component
    const { videowithAudio, audioonly, song } = this.state; //Video Format to Component
    var formattedDate = formatDistance(new Date(videoDate), new Date(), { locale: es, addSuffix: true });
    //const { songList, tokenNext } = this.props.route.params;

    return (
      <Fragment>
        <Appbar.Header style={css.appBarColor}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Resultados" subtitle={videoList.length + ' elementos'} />
          <Appbar.Action icon="link" onPress={this._handlePaste} />
          <Appbar.Action icon="magnify" onPress={this._handleSearch} />
          {/*<Appbar.Action icon="dots-vertical" onPress={null} />*/}
        </Appbar.Header>
        {showSearch ? (
          <View>
            <View style={css.searchBox}>
              <Searchbar style={css.searchStyle} onIconPress={this.validateTxt} iconColor={appLightRed}
                placeholder={keywordTxt} onChangeText={text => this.setState({ keywordTxt: text })} value={keywordTxt}
              />
              <Button style={css.btnSearch} labelStyle={css.btnSearchStyle} mode="outlined" compact={true} onPress={this.validateTxt}>Buscar</Button>
            </View>
            {showError ? <HelperText type="error" visible={showError}>{typeError}</HelperText> : null}
          </View>
        ) : null
        }
        {showPaste ? (
          <View style={css.pasteBox}>
            <Searchbar style={css.pasteStyle} inputStyle={css.pasteInputStyle} icon="content-paste" iconColor={appLightRed} onIconPress={this.readFromClipboard}
              placeholder="Link YouTube" onChangeText={text => this.setState({ link_YT: text })} value={link_YT}
            />
            <Button style={css.btnPaste} icon="send" labelStyle={css.btnPasteStyle} mode="outlined" compact={true} onPress={this.analyzeLink} />
          </View>
        ) : null
        }
        <ScrollView contentContainerStyle={css.gridScroll}>
          {videoList.map((item, index) => (
            <TouchableRipple
              key={index}
              borderless={false}
              onPress={() => this._handleItem(item.id.videoId)}
              rippleColor="red"
            //style={css.videoBox}
            >
              <View style={css.videoBox}>
                <View style={css.iconElementBox}>
                  <Image style={css.iconElementImg} source={{ uri: item.snippet.thumbnails.high.url }} />
                  <View style={css.badgeBox}>
                    <Badge size={17} style={css.badgeChild1}>MP3</Badge>
                    <Badge size={17} style={css.badgeChild2}>MP4</Badge>
                  </View>
                </View>
                <Title style={css.titleList} numberOfLines={2}>{item.snippet.title}</Title>
              </View>
            </TouchableRipple>
          ))}
          {btnLoadMore ? (
            <View style={css.fabSeeMoreBox}>
              <FAB style={css.fabSeeMore} icon="plus" onPress={() => this.searchMore()} />
            </View>
          ) : null}
        </ScrollView>
        {/* -------------------| I T E M |------------------- */}
        <Portal>
          <Modal style={css.loadingModal} visible={launchItemView} onDismiss={this.hideModal}>
            {loading ? <ActivityIndicator animating={true} color={appRed} size="large" />
              : (
                <Card style={css.cardView}>
                  <Image style={css.imgBackground} source={videoImg ? { uri: videoImg } : null} />
                  <IconButton style={css.closeIcon} icon="close" color={appRed} size={20} onPress={() => this.hideModal()} />
                  <View style={css.wallInfo}>
                    <Title style={css.titleTxt} numberOfLines={2}>{videoTitle}</Title>
                    <View style={css.subWall}>
                      <Title style={css.counterWithDate}>{videoReps} vistas • {formattedDate}</Title>
                    </View>
                    <View style={css.itemsAddsBox}>
                      <View style={css.itemsBar}>
                        <IconButton size={16} icon="thumb-up" color="#fff" style={css.iconLikes} />
                        <Text style={css.itemsBarTxt} numberOfLines={2}>{videoLikes + '\nMe Gusta'}</Text>
                      </View>
                      <View style={css.itemsBar}>
                        <IconButton size={30} icon="play" color={appLightRed} style={css.iconPlay} onPress={() => this._handlePlayer()} />
                        <Text style={css.itemsBarTxt} numberOfLines={2}>Vista Previa</Text>
                      </View>
                      {Platform.OS === 'android' ? (
                        <View style={css.itemsBar}>
                          <IconButton size={29} icon="plus" color="cyan" style={css.iconPlay} onPress={() => this._handleMoreFormats()} />
                          <Text style={css.itemsBarTxt} numberOfLines={2}>Más Formatos</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                  <Divider />
                  <View style={css.authorBox}>
                    <Avatar.Image style={css.avatarPic} size={40} source={videoAvatar ? { uri: videoAvatar } : null} />
                    <View style={css.authorTitleAndSubs}>
                      <Title style={css.authorTxt} numberOfLines={1}>{videoAutor}</Title>
                      {Platform.OS === 'android' ? <Title style={css.subsTxt}>{videoSubs} subs</Title> : null}
                    </View>
                  </View>
                  <Divider />
                  <View style={css.downloadTitleBox}>
                    <Text style={css.downloadTitle}>DESCARGAR</Text>
                  </View>
                  <Card.Actions style={css.actionsCard}>
                    <ScrollView contentContainerStyle={css.scrollBtnsDownloader}>
                      <View style={css.listMp4}>
                        {videowithAudio.map((item, index) => (
                          <Button
                            key={index}
                            style={css.btnMp4}
                            icon="play"
                            mode="contained"
                            onPress={() => this._downloadExecute(item, 'mp4')} // ------------------------ First Download Command
                            labelStyle={css.txtBtnCustomYTInfo}>
                            MP4 <Title style={css.txtQuality}>{item.qualityLabel}</Title>
                          </Button>
                        ))}
                      </View>
                      <View>
                        <Button
                          style={css.btnMp3}
                          icon="music"
                          mode="contained"
                          onPress={() => this._downloadExecute(song[0], 'mp3')} // ------------------------ Second Download Command
                          labelStyle={css.txtBtnCustomYTInfo}>
                          MP3
                        </Button>
                      </View>
                    </ScrollView>
                  </Card.Actions>
                </Card>
              )}
          </Modal>
        </Portal>

        {/* -------------------| PLAYER |------------------- */}
        <Portal>
          <Modal visible={openPlayer} onDismiss={this.hidePlayer}>
            <View>
              <YoutubePlayer height={270} play={false} videoId={videoId} />
            </View>
          </Modal>
        </Portal>

        {/* -------------------| MORE FORMATS |------------------- */}
        {moreFormats ? (
          <Portal>
            <Dialog visible={true} onDismiss={this.hideShowMore}>
              <Dialog.Title style={css.dialogTitle}>FORMATOS DISPONIBLES</Dialog.Title>
              <Divider />
              <Dialog.Content style={css.dialogContent}>
                {videowithAudio.map((item, index) => (
                  <View key={index} style={css.dialogRaw}>
                    <Button
                      style={css.dialogBtnMP4}
                      icon="play"
                      mode="contained"
                      onPress={() => this._downloadExecute(item, 'mp4')}  // ------------------------ More + MP4
                      labelStyle={css.dialogTxtBtnMP4}>
                      MP4
                    </Button>
                    <Surface style={css.surfaceBox}>
                      <Text style={css.surfaceNum3}>{item.qualityLabel}</Text>
                    </Surface>
                    <Surface style={css.surfaceBox}>
                      <Text style={css.surfaceNum2}>{Math.round((item.contentLength / 1000000) * 10) / 10}</Text>
                      <Text style={css.surfaceSub}>Mb</Text>
                    </Surface>
                  </View>
                ))}
                {audioonly.map((item, index) => (
                  <View key={index} style={css.dialogRaw}>
                    <Button
                      style={css.dialogBtnMP3}
                      icon="music"
                      mode="contained"
                      onPress={() => this._downloadExecute(item, 'mp3')}  // ------------------------ More + MP3
                      labelStyle={css.dialogTxtBtnMP3}>
                      MP3
                    </Button>
                    <Surface style={css.surfaceBoxCross}>
                      <Text style={css.surfaceNum}>{item.audioBitrate}</Text>
                      <Text style={css.surfaceTxt}>{'Kbps'}</Text>
                    </Surface>
                    <Surface style={css.surfaceBox}>
                      <Text style={css.surfaceNum2}>{Math.round((item.contentLength / 1000000) * 10) / 10}</Text>
                      <Text style={css.surfaceSub}>Mb</Text>
                    </Surface>
                  </View>
                ))}
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={this.hideShowMore}>Regresar</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        ) : null}

        {/* -------------------| PROGRESS BAR DOWNLOAD |------------------- */}
        <Portal>
          <Modal visible={progressModal} onDismiss={hideProgressModal} style={css.backgroundModal}>
            <Card style={css.cardProgress}>
              <Appbar.Header style={css.headerDownloads} >
                <Appbar.BackAction onPress={() => this.closeProgress()} />
                <Appbar.Content title={status} subtitle={'Archivo ' + typeU} />
                <Appbar.Action icon="close" onPress={() => this.closeProgress()} />
              </Appbar.Header>
              <View style={css.globalContainer}>
                <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite" source={videoImg ? { uri: videoImg } : null} style={css.imgProgress} />
                <Title style={css.titleProgress} numberOfLines={2}>{videoTitle + '.' + typeU}</Title>
                <View style={css.barAndStatus}>
                  {Platform.OS === 'ios' ? <Title style={css.percentProgress}>{Math.trunc(downloadProgress * 100) + '%'}</Title>
                    : <Title style={css.sizeStyle}>{Math.round((videoSize / 1000000) * 10) / 10 + ' MB'}</Title>}
                  <ProgressBar progress={downloadProgress} indeterminate={isIndet} color={colorLine} style={css.progressStyle} />
                </View>
                <View style={css.actionsProcess}>
                  <Button
                    disabled={disabledPlay}
                    labelStyle={css.txtBtnProgress}
                    mode="outlined"
                    icon="open-in-new"
                    color={'#0FCC82'}
                    style={css.btnProcess}
                    onPress={() => this.openFile()}>
                    Abrir
                  </Button>
                </View>
              </View>
            </Card>
          </Modal>
          <Snackbar
            visible={showSnack}
            onDismiss={this.onDismissSnackBar}
            style={css.snackStyle}
            action={{ label: 'Ver', labelStyle: css.txtActionSnack, onPress: () => this.openFile() }}>
            <Title style={css.txtSnack}> ¡Archivo Descargado! 🔥 </Title>
          </Snackbar>
        </Portal>
      </Fragment>
    );
  }
}

export default withTheme(ListVideo);
