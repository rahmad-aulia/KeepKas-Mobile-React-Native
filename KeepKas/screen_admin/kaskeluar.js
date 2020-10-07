import React from 'react'
import {View, StyleSheet, FlatList, Alert} from 'react-native'
import firebase from '../database/firebase'
import ListKasKeluarAdmin from '../screen_node/ListKasKeluarAdmin'
import ButtonInput from '../screen_components/ButtonInput'

export default class KasKeluar extends React.Component {
   constructor() {
      super()
      this.state = {
        data: ''
      }
    }
    componentDidMount() {
      this.fetchData()
   }
    fetchData = async () => {
      const { uid } = this.props.route.params
      const db = firebase.database().ref()
      const twoRef = db.child('kas_keluar').orderByChild('id_admin').equalTo(uid)
      twoRef.on('value', snap => {
           const datai = snap.val()
           this.setState({data : datai})
        })
    }
    Nilai(list) {
      this.props.navigation.navigate('DetailKasKeluar', {
      data : this.setState.data = list
      })
    }
    CekData(){
      if (this.state.data == undefined)
      {
        Alert.alert('Data Kas Keluar', 'Data Kosong/Tidak ditemukan')
      }
      else
      {
        return Object.values(this.state.data)
      }
    }
   render(){
      const nilai = this.CekData()
   return (
      <View style={styles.container}>
         <View style={styles.body}>
            <FlatList
               data={nilai}
               renderItem={({ item }) => <ListKasKeluarAdmin Nilai={this.Nilai.bind(this)} data={item} />}
               keyExtractor={item => item.id}
            />
         </View>
         <View style={{margin: 20}}>
          <ButtonInput
              onPress={() => {this.props.navigation.navigate('TambahKasKeluar', {uid: firebase.auth().currentUser.uid, displayName : firebase.auth().currentUser.displayName})}}
              titleButton = 'Tambah Pengeluaran'
              Txt = 'Tambah Pengeluaran'
              Color = '#B90303'
            />
         </View>
      </View>
   )}
}

const styles = StyleSheet.create({
   container: {
     justifyContent: 'space-between',
     flex: 1
   },
   body: {
     margin: 2
   },
 });