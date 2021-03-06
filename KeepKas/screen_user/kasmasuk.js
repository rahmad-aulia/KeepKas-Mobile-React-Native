import React from 'react';
import { StyleSheet, View,FlatList, Alert, Text} from 'react-native'
import firebase from '../database/firebase'
import moment from 'moment'
import ListKasMasukUser from '../screen_node/ListKasMasukUser'
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Kasmasuk extends React.Component {
  constructor() {
    super()
    this.state = {
      data: ''
    }
  }
  componentDidMount() {
    this.fetchData()
 }
 getDateWithMoment = () => {
  return moment().format('DD');
}

  fetchData = async () => {
    const { photoURL } = this.props.route.params
    const db = firebase.database().ref('kas_masuk/'+photoURL+'/').orderByChild('sorting')
    db.on('value', (snapshot)=>{
      var li = []
      snapshot.forEach((child)=>{
        li.push({
          id:child.val().id,
          id_admin:child.val().id_admin,
          nama:child.val().nama,
          nominal:child.val().nominal,
          keterangan:child.val().keterangan,
          status:child.val().status,
          date: child.val().date
        })
      })
      this.setState({data:li})
    })
  }

  render(){
    const nilai = Object.values(this.state.data)
    const NullData=()=>{
      return (
        <View style={{alignItems: 'center', paddingTop: 30}}>
          <Text style={{color:'#a7a7a7', fontSize: 14}}>Data Kosong/Tidak Ditemukan</Text>
        </View>
      )
    }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
            data={nilai}
            renderItem={({ item }) => <ListKasMasukUser data={item} />}
            keyExtractor={item=>item.id}
            ListEmptyComponent={NullData()}
        />
      </View>
      <FAB 
        buttonColor='#20c720' 
        iconTextColor="#FFFFFF" 
        onClickAction={() => {this.props.navigation.navigate('BayarKasUser',{uid : firebase.auth().currentUser.uid, displayName: firebase.auth().currentUser.displayName, photoURL: firebase.auth().currentUser.photoURL})}}
        visible={true} 
        iconTextComponent={<Icon name="plus"/>} 
      />   
    </View>
  )

  }
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    justifyContent: 'space-between'
  },
  body: {
    margin: 2,
  }
});
