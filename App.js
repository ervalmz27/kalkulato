import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      hasil: 0,
      error: false,
      maxLengthInput: 50,
      check: false,
      number: '',
      number1: '',
      number2: '',
    };
  }

  calcSum(text) {
    let numberRegex = /([\d])/;

    let arithmeticSignRegex = /([+*/%-])/;

    let numAriSignRegex = /([+*/%\d-])/;
    let numAriSignRegexReverse = /([^+*/%-\d ])/;

    if (text !== '') {
      if (text.match(numAriSignRegexReverse) && text !== '') {
        this.setState({
          error: 'Input mengandung karakter yang dilarang',
          maxLengthInput: text.length,
        });
      } else {
        let trimmedText = '';

        let newText = '';

        for (let i = 0; i < text.length + 1; i++) {
          if (i !== text.length) {
            if (text[i] === ' ') {
              continue;
            } else {
              trimmedText += text[i];
            }
          } else {
            if (!trimmedText[0].match(numberRegex)) {
              return this.setState({
                error: 'Karakter pertama harus berupa angka',
                maxLengthInput: trimmedText.length,
              });
            }

            // ini hanya akan berjalan pada perulangan terakhir yaitu kelebihan perulangan
            // yang telah dibuat dengan length + 1 diatas

            // perulangan kedua ini juga dibuat kelebihan satu
            for (let u = 0; u < trimmedText.length + 1; u++) {
              if (u !== trimmedText.length) {
                // berjalan sebanyak length trimmedText
                if (trimmedText[u].match(numberRegex)) {
                  this.setState({check: true});
                  // proses untuk index u yang ada numbernya.

                  // else if dibawah bertujuan untuk memisahkan number dan arithmetic sign
                  // dengan titik (.) yang akan dimasukkan kedalam variable newText
                  if (
                    trimmedText[u + 1] !== undefined &&
                    trimmedText[u + 1].match(arithmeticSignRegex)
                  ) {
                    // masukkan titik jika index u + 1 adalah arithmetic sign
                    newText += trimmedText[u] + '.';
                  } else {
                    // jangan masukkan jika bukan
                    newText += trimmedText[u];
                  }
                } else {
                  // proses untuk index u yang ada arithmetic sign nya

                  // if untuk pencegahan jika inputan mengandung operator arithmetic yang berderet
                  // (ex: 4+4--)
                  if (
                    trimmedText[u + 1] !== undefined &&
                    trimmedText[u + 1].match(arithmeticSignRegex)
                  ) {
                    return this.setState({
                      error: 'Masukkan angka setelah operator arithmetic',
                      maxLengthInput: trimmedText.length,
                    });
                  } else {
                    this.setState({
                      error: false,
                      maxLengthInput: 50,
                    });
                  }
                  if (
                    trimmedText[u + 1] !== undefined &&
                    trimmedText[u + 1].match(numberRegex)
                  ) {
                    newText += trimmedText[u] + '.';
                  } else {
                    newText += trimmedText[u];
                  }
                }
              } else {
                let result = (resultText, callback) => {
                  if (resultText !== '' && typeof resultText === 'string') {
                    if (resultText.match(/(\.)/)) {
                      this.setState({check: true});
                      resultText = resultText.split('.');
                    } else {
                      resultText = resultText.split();
                    }
                  } else {
                    resultText = [''];
                    this.setState({check: false});
                  }

                  if (resultText[0] !== '') {
                    if (resultText.length >= 2) {
                      if (
                        resultText[resultText.length - 1].match(
                          arithmeticSignRegex,
                        )
                      ) {
                        callback(this.state.hasil);
                      } else if (
                        resultText[resultText.length - 1].match(numberRegex)
                      ) {
                        callback(eval(resultText.join('')));
                      }
                    }
                  } else {
                    callback(0);
                  }
                };

                let insertToState = result => {
                  this.setState({
                    error: false,
                    hasil: result,
                  });
                };
                result(newText, res => insertToState(res));
              }
            }
          }
        }
        this.setState({
          maxLengthInput: 50,
        });
      }
    } else {
      this.setState({
        hasil: 0,
        error: false,
        maxLengthInput: 50,
      });
    }
  }

  render() {
    const {hasil, error, maxLengthInput, number, number1, number2} = this.state;
    console.log('hasil : ', hasil, number, number1, number2);

    return (
      <View style={styles.container}>
        <Text style={styles.title}> Kalkulator </Text>
        {error !== false && <Text style={styles.textError}> {error} </Text>}
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            style={error !== false ? styles.inputError : styles.input}
            maxLength={maxLengthInput}
            value={number}
            onChangeText={e => this.setState({number: e})}
          />
          {number != '' ? (
            <View style={{marginTop: 7}}>
              <CheckBox
                disabled={false}
                value={true}
                onValueChange={newValue => this.setState({check: newValue})}
              />
            </View>
          ) : (
            <View style={{marginTop: 7}}>
              <CheckBox
                disabled={false}
                value={this.state.check}
                onValueChange={newValue => this.setState({check: newValue})}
              />
            </View>
          )}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            style={error !== false ? styles.inputError : styles.input}
            maxLength={maxLengthInput}
            value={number1}
            onChangeText={v => this.setState({number1: v})}
          />
          {number1 !== '' ? (
            <View style={{marginTop: 7}}>
              <CheckBox
                disabled={false}
                value={true}
                onValueChange={newValue => this.setState({check: newValue})}
              />
            </View>
          ) : (
            <View style={{marginTop: 7}}>
              <CheckBox
                disabled={false}
                value={this.state.check}
                onValueChange={newValue => this.setState({check: newValue})}
              />
            </View>
          )}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            style={error !== false ? styles.inputError : styles.input}
            maxLength={maxLengthInput}
            onChangeText={t => this.setState({number2: t})}
            value={number2}
          />
          {number2 != '' ? (
            <View style={{marginTop: 7}}>
              <CheckBox
                disabled={false}
                value={true}
                onValueChange={newValue => this.setState({check: newValue})}
              />
            </View>
          ) : (
            <View style={{marginTop: 7}}>
              <CheckBox
                disabled={false}
                value={this.state.check}
                onValueChange={newValue => this.setState({check: newValue})}
              />
            </View>
          )}
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.bottom}>
            <Button
              title="+"
              onPress={() =>
                this.calcSum(number + '+' + number1 + '+' + number2)
              }
            />
          </View>
          <View style={styles.bottom}>
            <Button
              title="-"
              onPress={() =>
                this.calcSum(number + '-' + number1 + '-' + number2)
              }
            />
          </View>
          <View style={styles.bottom}>
            <Button
              title="x"
              onPress={() =>
                this.calcSum(number + '*' + number1 + '*' + number2)
              }
            />
          </View>
          <View style={styles.bottom}>
            <Button
              title="/"
              onPress={() =>
                this.calcSum(number + '/' + number1 + '/' + number2)
              }
            />
          </View>
        </View>
        <TextInput
          style={styles.hasil}
          editable={false}
          value={'Hasil: ' + String(hasil)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  bottom: {
    backgroundColor: '#ffffff',
    width: 60,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    width: '60%',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  hasil: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  inputError: {
    width: '60%',
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  textError: {
    color: 'red',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
  },
  checkbox: {
    alignSelf: 'center',
  },
});
