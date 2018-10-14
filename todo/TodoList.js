import React from 'react';
import {
    Text,
    ScrollView,//Todoのデータが画面いっぱいになった時にスクロールができるようにする
    View,
    StyleSheet,
    TouchableOpacity,
} from  'react-native';

const styles = StyleSheet.create({

    scrollView : {
        backgroundColor: '#DDD',
    
      },
      todoContainer: {
        flexDirection: 'row', //横並びにする
        backgroundColor: '#FFF',
        padding: 18,
        justifyContent: 'space-between',//要素の真ん中に等間隔でスペースを入れる
      },


});




export default (props) => (


    <ScrollView style={styles.scrollView}>
    {
     props.todos.map((todo,index) => ( //map配列を順番に取り出す
        <View  key={todo+index} style={styles.todoContainer}>
        {/*//keyで一意の指定をしないと警告が出る*/}
            <Text>{todo}</Text>   
            <TouchableOpacity onPress={() => props.onPressDelete(index)}>
                <Text>DELETE</Text>
            </TouchableOpacity>
        </View>
    ))
    }
    </ScrollView>

);
