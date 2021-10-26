import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import FriendChat from '../views/chat/FriendChat.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            hidden: true
        },{
            path: '/home',
            name: 'Home',
            component: Home,
            hidden: true,
            meta:{
                role:['admin', 'user']
            },
            children:[
                {
                    path: '/chat',
                    name: 'FriendChat',
                    component: FriendChat,
                    hidden: true
                }
            ]
        },

    ]
})
