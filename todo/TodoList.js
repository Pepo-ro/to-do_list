import React from 'react';
import {
    Text,
    ScrollView,//Todoのデータが画面いっぱいになった時にスクロールができるようにする
    View,
    StyleSheet
} from  'react-native';

const styles = StyleSheet.create({

    scrollView : {
        backgroundColor: '#DDD',
    
      },
      todoContainer: {
        backgroundColor: '#FFF',
        padding: 18,
      },


});


export default (props) => (


    <ScrollView style={styles.scrollView}>
    {
     props.todos.map((todo,index) => ( //map配列を順番に取り出す
        <View  key={todo+index} style={styles.todoContainer}>
        {/*//keyで一意の指定をしないと警告が出る*/}
        <Text>{todo}</Text>   
        </View>
    ))
    }
    </ScrollView>

);
