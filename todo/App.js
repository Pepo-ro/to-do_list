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
        AsyncStorage,
      } from 'react-native';
import TodoList from './TodoList'; 

export default class App extends Component {
  state = {
    newTodo: '',
    todos: [],
  }

  constructor(props){
    super(props);//絶対に必要になる
    this.loadTodos();
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
    },() => this.storeTodos()); //setStateの第二引数はsetStateの処理が終わった瞬間に呼び出される


  
  }

  onPressDelete(index)  {
    this.setState({
      todos: this.state.todos.filter((t,i) => i !== index ), //indexとiが同じもの以外の配列を生成する
    },() => this.storeTodos());
    
  }

  //保存のためのメソッド
  storeTodos(){
    const str = JSON.stringify(this.state.todos); //todosの配列をstringに変換
    AsyncStorage.setItem('todos',str)//todosをkeyにしてstrを保存
  }

  //読み込みのためのメソッド
  loadTodos(){
    AsyncStorage.getItem('todos').then((str) => { //非同期処理でkeyが「todos」のデータを呼び出す
      const todos = str ? JSON.parse(str) : []; //strが空の時に[]　データがあればJSON型の配列にして変換
      this.setState({todos});
    })

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
