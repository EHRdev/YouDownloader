/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  Image,
  Keyboard,
  StatusBar,
  LogBox,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  withTheme,
  Button,
  TextInput,
  HelperText,
} from 'react-native-paper';
import 'react-native-gesture-handler';
import css from '../Styles/Styles';
import { API_KEY } from '../env';
import {
  colorSelection,
  appDark,
} from '../Styles/Styles';

//------- Globales --------|
var typeError = '';
LogBox.ignoreAllLogs();
//-------------------------|

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywordTxt: '',
      videoList: [],
      tokenNext: '',
      searching: false,
      showError: false,
    };
  }

  selectBug = () => {
    //console.log('typeError', JSON.stringify(typeError));
    const ee = JSON.stringify(typeError);
    ee.includes('Network')
      ? (typeError = 'Revisa tu conexión a Internet')
      : null;
    this.setState({ showError: true, spin: false });
  };

  _navigate = () => {
    this.props.navigation.navigate('ListVideo', {
      videoList: this.state.videoList,
      tokenNext: this.state.tokenNext,
      keywordTxt: this.state.keywordTxt,
    });
  }

  searchSong = () => {
    const apiKey = API_KEY;  //Llave
    const keyWord = this.state.keywordTxt;

    fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=' + keyWord + '&key=' + apiKey)
      .then(response => response.json())
      .then((response) => {
        //console.log('response: ', response);
        this.setState({
          videoList: response.items,
          tokenNext: response.nextPageToken,
          searching: false,
        });
        this._navigate();
      })
      .catch((e) => {
        console.log('Error Object: ', e + 'Error Msn: ', e.message);
        e.message.includes('Network') ? typeError = 'No hay conexión a Internet' : null;
        this.setState({ showError: true, searching: false });
      });

  }

  validateTxt = () => {
    const string = this.state.keywordTxt;
    string === ''
      ? ((this.setState({ showError: true, searching: false }), typeError = 'El campo de busqueda está vacío'))
      : ((this.setState({ showError: false, searching: true }), this.searchSong(), Keyboard.dismiss()));
  }

  render() {
    //console.log(this.state);
    const { keywordTxt, showError } = this.state;

    return (
      <View style={css.container}>
        <StatusBar backgroundColor={appDark} />
        <View style={Platform.OS === 'ios' ? (css.boxIos) : (css.boxAndroid)}>
          <Image style={Platform.OS === 'ios' ? (css.frontLogoIOS) : (css.frontLogo)} source={require('../Media/Front_App_Logo.png')} />
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? ('padding"') : ('height')} keyboardVerticalOffset={-100}>
          <TextInput
            style={css.inputCustom}
            placeholder="Título del video o canción"
            mode="outlined"
            value={keywordTxt}
            onChangeText={text => this.setState({ keywordTxt: text })}
            selectionColor={colorSelection}
          />
          <HelperText type="error" visible={showError}>{typeError}</HelperText>
          <View style={css.actionsCustom}>
            <Button
              style={css.searchBtn}
              mode="contained"
              onPress={this.validateTxt}
              loading={this.state.searching}
              labelStyle={css.labelSearchBtn}>
              Buscar
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default withTheme(MainScreen);
