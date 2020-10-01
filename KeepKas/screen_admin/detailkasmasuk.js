import React from 'react'
import {View, StyleSheet, Alert,Text } from 'react-native'
import firebase from '../database/firebase'

import ButtonInput from '../screen_components/ButtonInput'
import Loading from '../screen_components/Loading'

export default class DetailKasMasuk extends React.Component {
   constructor() {
      super()
      this.state = {
        isLoading: false
      }
    }
   currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

    konfirmasi = () => {
      this.setState({isLoading: true})
      const { data } = this.props.route.params
      firebase.database().ref('kas_masuk/'+ data.id + '/').update({status : 'Sukses'})
      firebase.database().ref('total_kas_masuk/'+data.id_kasmasuk+ '/').update({[data.id] : data.jumlah})
      .then(()=>{
         Alert.alert('Sukses', 'Data berhasil di Konfirmasi')
         this.props.navigation.navigate('KasMasukAdmin')
         this.setState({isLoading: false})
      })
      .catch((error) => {
         this.setState({isLoading: false})
         console.log(error)
         alert(error)
      })
    }

    delete = () => {
      this.setState({isLoading: true})
      const { data } = this.props.route.params
      firebase.database().ref('kas_masuk/'+ data.id + '/').remove()
      firebase.database().ref('total_kas_masuk/'+data.id_kasmasuk+ '/' + data.id + '/').remove()
      .then(()=>{
         Alert.alert('Sukses', 'Data berhasil di Hapus')
         this.props.navigation.navigate('DashboardAdmin')
         this.setState({isLoading: false})
      })
      
      .catch((error) => {
         this.setState({isLoading: false})
         console.log(error)
         alert(error)
      })
    }

   render() {
      const { data } = this.props.route.params      
      return (
         <View style={styles.container}>

            <View style={{alignItems: 'center'}}>
               <Text style={styles.titleHeader}>Detail Kas Masuk</Text>
            </View>

            <View style={styles.box}>
               <View>
                  <Text style={styles.titleInfo}>Nama</Text>
                  <Text style={styles.titleInfo}>Nominal</Text>
                  <Text style={styles.titleInfo}>Tanggal</Text>
                  <Text style={styles.titleInfo}>Status</Text>
               </View>
               <View>
                  <Text style={styles.titleInfo}>: {data.nama}</Text>
                  <Text style={styles.titleInfo}>: {this.currencyFormat(Number(data.jumlah))}</Text>
                  <Text style={styles.titleInfo}>: {data.waktu}</Text>
                  <Text style={styles.titleInfo}>: {data.status}</Text>
               </View>
            </View>
            <View style={styles.box1}>
               <Text style={styles.titleInfo}>Keterangan :</Text>
                  <Text style={styles.titleInfo1} numberOfLines = {10}>{data.keterangan}</Text>
            </View>

            <ButtonInput
               onPress={() => this.konfirmasi()}
               titleButton = 'Konfirmasi'
               Txt = 'Konfirmasi'
               Color = '#3C6AE1'
               MarginTop = {20}
            />

            <ButtonInput
               onPress={() => this.delete()}
               titleButton = 'Hapus Data'
               Txt = 'Hapus Data'
               Color = '#B90303'
               MarginTop = {20}
            />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      margin: 20
   },
   kolomRincian:{
      height: 100,
      elevation: 5,
      backgroundColor: 'white',
      borderRadius : 5
   },
   titleHeader :{
      margin: 20,
      fontSize: 24,
      fontWeight: 'bold'
   },
   box:{
      backgroundColor: '#088506',
      alignItems: 'center',
      borderRadius: 5,
      padding: 20,
      flexDirection: 'row',
      elevation: 10
   },
   titleInfo: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      paddingRight: 5,
   },
   box1 :{
      backgroundColor: '#088506',
      justifyContent: 'center',
      borderRadius: 5,
      padding: 20,
      elevation: 10,
      marginTop: 20
   },
   titleInfo1 : {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 20
   },
})