/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
        StyleSheet, 
        Text, 
        View,
        TextInput, //textinput を入力可能にする
        TouchableOpacity,//ボタンのタッチした時にアニメーションが発生するコンポーネント

      } from 'react-native';
import TodoList from './TodoList'; 

export default class App extends Component {
  state = {
    newTodo: '',
    todos: [],
  }
  //テキストフォームに変更が合った時に呼びださえれる
  onChangeText(newTodo){
    this.setState({ newTodo });

  }

  onPressAdd(){
  
    const {newTodo} = this.state; //この書き方はstateの特定の変数を取り出すことができる
    this.setState({
      newTodo: '',
      todos : [newTodo, ...this.state.todos], //新しいnewTodoと前のnewTodoを合成した配列を作成
    })
  
  }

  onPressDelete(index)  {
    this.setState({
      todos: this.state.todos.filter((t,i) => i !== index ), //indexとiが同じもの以外の配列を生成する
    });
    
  }


  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.newTodo} 
          style={styles.form} 
          onChangeText={text => this.onChangeText(text) } /*テキストの変更を取得することができる*/
        />
        {/*ボタンのアニメショーンの追加*/}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => this.onPressAdd()} //ボタンが押された時に呼ばれる  
        >
          <Text style={styles.addButtonText} >ADD</Text>
        </TouchableOpacity>
        {/*TodoListにpropsでtodosを呼び出すため引数がいる*/}
        <TodoList 
          todos={this.state.todos} 
          onPressDelete={(index) => this.onPressDelete(index)}
        
        />  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  form: {
    backgroundColor : '#EEE',
  },

  addButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 4, //ボダンの角を丸くする
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    textAlign: 'center', //位置設定 
    fontWeight: 'bold', //太文字設定
  },

});
