import {request} from '@/network/request'

const state = {
    login: false,
    user_id: 0,
    name: "Ivy",
    passwd: "psIvywd",

    friend_list: [{name: 'user1'}, {name: 'user2'}, {name: 'user3'}, {name: 'user4'}]
}


const mutations = {
    updateFriendList(state: { friend_list: any }, newFriendList: any){
        state.friend_list = newFriendList
    },
    setName(state: { name: any }, newName: any){
        state.name = newName
    },
    logIn(state: { login: boolean }){
        state.login = true
    },
    logOut(state: { login: boolean }){
        state.login = false
    }
}


const actions = {
    updateFriendListFromNetwork(context: { state: { name: any }; commit: (arg0: string, arg1: any) => void }){
        // console.log(context.state.name)
        request({
            method: 'post',
            url: '/api/get_friends_list/',
            data: {
              username: context.state.name
            }
        }).then((msg: { data: { friend_list: any[] } }) =>{
            // console.log(msg.data.friend_list.map(function(user){return {name: user}}))
            context.commit('updateFriendList', msg.data.friend_list.map(function(user){return {name: user}}))
        }).catch((err: any) => {
            console.log(err)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }