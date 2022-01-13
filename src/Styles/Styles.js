/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const API_KEY = 'AIzaSyA6NT-_-XyBUJxPlVsYhMTIuP6xTJNI04Q'; // Llave YT para MainScreen & ListVideo

export const appRed = '#C72D2D';
export const appNavy = '#C1083D';
export const appLightRed = '#EC4848';
export const appDark = '#121212';

//------------------------ General Colors

export const colorSpinner = '#B32525';
export const colorSelection = '#414141';
export const basicYellow = 'yellow';

const css = StyleSheet.create({

  //------------------------ 001 Main Screen
  container: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  boxIos: {
    //marginTop: 50,
    marginTop: windowHeight / 7,
  },
  boxAndroid: {
    //
  },
  frontLogo: {
    width: 350,
    height: 230,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  frontLogoIOS: {
    width: 370,
    height: 240,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  inputCustom: {
    height: 79,
    fontSize: 16,
  },
  actionsCustom: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchBtn: {
    width: '47%',
    height: 65,
    margin: 8,
    justifyContent: 'center',
  },
  labelSearchBtn: {
    fontSize: 16,
    letterSpacing: 1,
  },

  //------------------------ 002 ListVideo Screen
  appBarColor: {
    backgroundColor: appDark,
  },
  searchBox: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 8,
    marginRight: 8,
  },
  searchStyle: {
    width: windowWidth - 90,
    //marginTop: 5,
  },
  btnSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    marginLeft: 4,
  },
  btnSearchStyle: {
    fontSize: 13,
    color: 'white',
  },
  pasteBox: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 8,
    marginRight: 8,
  },
  pasteStyle: {
    width: windowWidth - 90,
    //backgroundColor: 'red',
    //marginTop: 5,
  },
  pasteInputStyle: {
    fontSize: 12,
    letterSpacing: 0,
  },
  btnPaste: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    marginLeft: 4,
    //padding: 8,
    elevation: 4,
  },
  btnPasteYT: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    marginLeft: 4,
    //padding: 8,
    elevation: 4,
  },
  btnPasteStyle: {
    fontSize: 13,
    color: 'white',
  },
  gridScroll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  videoBox: {
    width: (windowWidth / 2) - 16,
    margin: 8,
  },
  iconElementBox: {
  },
  iconElementImg: {
    width: (windowWidth / 2) - 16,
    height: 80,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  badgeBox: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  badgeChild1: {
    backgroundColor: '#1B117C',
    borderRadius: 0,
  },
  badgeChild2: {
    backgroundColor: '#891220',
    borderRadius: 0,
  },
  titleList: {
    fontSize: 13,
    letterSpacing: -1,
    lineHeight: 16,
    paddingLeft: 5,
  },
  fabSeeMoreBox: {
    //position: 'relative',
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabSeeMore: {
    //position: 'absolute',
    margin: 10,
  },

  //------------------------ 003 Item Screen

  loadingModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginTop: 0,
  },
   //------------------------ Card Main
   cardView: {
    maxWidth: 450,
    maxHeight: 650,
    margin: 20,
  },
  imgBackground: {
    //position: 'relative',
    height: 210,
  },
  closeIcon: {
    position: 'absolute',
    margin: 1,
    right: 0,
    top: 0,
  },
  //------------------------ Wall Info
  wallInfo: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  titleTxt: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0,
    textAlign: 'justify',
    lineHeight: 15,
  },
  subWall: {
    marginTop: '-3%',
  },
  counterWithDate: {
    fontSize: 9,
  },
//------------------------ Surface Likes Container
  itemsAddsBox: {
    flexDirection: 'row',
    height: 50,
  },
  itemsBar: {
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLikes: {
    margin: '-2%',
  },
  iconPlay: {
    margin: -10,
  },
  itemsBarGlobal: {
    flexDirection: 'row',
  },
  itemsBarTxt: {
    fontSize: 9,
    color: '#fff',
    textAlign: 'center',
  },
//------------------------ Author
  authorBox: {
    marginTop: 10,
    flexDirection: 'row',
    height: 50,
  },
  avatarPic: {
    margin: 4,
    marginLeft: 12,
    marginRight: 12,
  },
  authorTitleAndSubs: {
    position: 'relative',
    width: 270,
  },
  authorTxt: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  subsTxt: {
    fontSize: 8,
    position: 'absolute',
    top: 12,
  },

//------------------------ Download Zone
  downloadTitleBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
   downloadTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 8,
    lineHeight: 20,
    textAlign: 'center',
  },
//------------------------ Card Footer
  actionsCard: {
    maxHeight: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listMp4: {
    flexDirection: 'column',
  },
  btnMp4: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 145,
    height: 55,
    margin: 5,
  },
  txtBtnCustomYTInfo: {
    fontSize: 16,
    letterSpacing: 2,
  },
  txtQuality: {
    fontSize: 12,
  },
  btnMp3: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 145,
    height: 55,
    margin: 5,
    backgroundColor: '#1D65FF', // Botón azul
  },
  fab: {
    backgroundColor: '#8E0CE2', // Color FAB (+)
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
//--- Dialog in ListSong ---
    dialogTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      letterSpacing: 2,
      textAlign: 'justify',
      lineHeight: 15,
    },
    dialogContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    dialogRaw: {
      flexDirection: 'row',
    },
    dialogBtnMP4: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
      height: 50,
      margin: 5,
    },
    dialogBtnMP3: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
      height: 50,
      margin: 5,
      //backgroundColor: '#1D65FF', // Botón azul
      backgroundColor: '#E8E8E8', // Botón gris
    },
    dialogTxtBtnMP4: {
      fontSize: 16,
      letterSpacing: 1,
    },
    dialogTxtBtnMP3: {
      color: '#000',
      fontSize: 16,
      letterSpacing: 1,
    },
  //----------------- Surface Boxes
    surfaceBox: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      width: 50,
      height: 50,
      elevation: 4,
      margin: 5,
      borderRadius: 4,
    },
    surfaceBoxCross: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      width: 50,
      height: 50,
      elevation: 4,
      margin: 5,
      borderRadius: 4,
    },
    surfaceTxt: {
      fontSize: 10,
      letterSpacing: -1 / 2,
      textAlign: 'center',
    },
    surfaceNum: {
      fontSize: 11,
      textAlign: 'center',
      //color: appLightRed,
      color: 'gold',
      fontWeight: 'bold',
      //margin: 0,
    },
    surfaceNum2: {
      fontSize: 13,
      textAlign: 'center',
      color: appLightRed,
      margin: 0,
      marginRight: 2,
      letterSpacing: -1,
    },
    surfaceNum3: {
      fontSize: 13,
      textAlign: 'center',
      color: '#4CCEFF',
      margin: 0,
      letterSpacing: -1,
    },
    surfaceSub: {
      fontSize: 11,
      textAlign: 'center',
    },
//------------------------------------------------
    backgroundModal: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      height: windowHeight,
      marginTop: 0,
    },
    cardProgress: {
      backgroundColor: '#0B0B0B',
      maxWidth: windowWidth,
      height: 400,
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    globalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgProgress: {
      margin: 20,
      width: 120,
      height: 120,
      borderRadius: 25,
    },
    titleProgress: {
      width: windowWidth,
      paddingLeft: 40,
      paddingRight: 40,
      fontSize: 15,
      lineHeight: 18,
      marginTop: 5,
      marginBottom: 10,
      letterSpacing: -1,
      textAlign: 'justify',
    },
    barAndStatus: {
      flexDirection: 'column',
      width: windowWidth,
      paddingLeft: 40,
      paddingRight: 40,
    },
  percentProgress: {
    fontSize: 12,
    letterSpacing: 1,
    color: 'yellow',
  },
  sizeStyle: {
    fontSize: 13,
    letterSpacing: 0,
    color: 'yellow',
  },
  progressStyle: {
    height: 15,
    borderRadius: 10,
    //opacity: 0.8,
  },
  statusProgress: {
    fontSize: 11,
    letterSpacing: 2,
  },
  actionsProcess: {
    flexDirection: 'row',
    marginTop: 30,
  },
  txtBtnProgress: {
    fontSize: 16,
    letterSpacing: 2,
  },
  btnProcess: {
    borderRadius: 20,
    width: 130,
  },
  endClose: {
    position: 'absolute',
    right: 20,
    top: 0,
  },
//------------------------ SnackBar
    snackStyle: {
      margin: 5,
      backgroundColor: '#1536B0', // Snack Azul
      opacity: 0.7,
    },
    txtSnack: {
      fontSize: 15,
      fontWeight: 'bold',
      letterSpacing: 0,
    },
    txtActionSnack: {
      fontSize: 15,
      fontWeight: 'bold',
      letterSpacing: 2,
      color: 'orange',
    },

    scrollBtnsDownloader: {
      flexDirection: 'row',
      justifyContent: 'center',
    },

//------------------------ Center Forms
    centerBox: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },

});

export default css;
