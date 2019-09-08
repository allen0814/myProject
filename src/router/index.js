import Vue from 'vue'
import Router from 'vue-router'

import Demo from '@/page/demo'
import Demo2 from '@/page/demo2'
import Demo3 from '@/page/demo3'
import Demo4 from '@/page/demo4'
import Demo5 from '@/page/demo5'
import Demo6 from '@/page/demo6'
import Demo7 from '@/page/demo7'
import Element from '@/page/element'
import Login from '@/item/login'
import Home from '@/item/home'

import callComponent from '@/page/callComponent'

import Answer from "@/components/dialogue/answer/index.vue"
import Question from "@/components/dialogue/question/index.vue"
import Ask from "@/components/dialogue/ask/index.vue"

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/demo',
            component: Demo
        },
        {
            path: '/demo2',
            component: Demo2
        },
        {
            path: '/demo3',
            component: Demo3
        },
        {
            path: '/demo4',
            component: Demo4
        },
        {
            path: '/demo5',
            component: Demo5
        },
        {
            path: '/demo6',
            component: Demo6
        },
        {
            path: '/demo7',
            component: Demo7
        },
        {
            path: '/element',
            component: Element
        },
        {
            path: '/callComponent',
            component: callComponent
        },
        {
            path: '/item/login',
            component: Login
        },
        {
            path: '/item/home',
            component: Home
        }, {
            path: '/answer',
            component: Answer
        }, {
            path: '/question',
            component: Question
        }, {
            path: '/ask',
            component: Ask
        }
    ]
})
