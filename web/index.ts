
/**
 * 网页逻辑
 */
import Vue from "../src"
import * as App from './App.vue'
console.log(App)
const app = new Vue({
  el: document.querySelector('#canvas'),
  data: {},
  render: (App as any).template
  // render(h) {
  //   return h('div', {
  //     backgroundColor: 'pink',
  //   },[
  //     h('div', {
  //       backgroundColor: 'red',
  //       height: 300,
  //       overflow: 'scroll'
  //       // width: 200
  //     },[
  //       h('div', {
  //         backgroundColor: 'yellow',
  //         height: 400,
  //         width: 200,
  //         overflow: 'scroll'
  //       },[
  //         h('div', {
  //           backgroundColor: 'white',
  //           height: 100,
  //           width: 600
  //         },[
  //           123
  //         ])
  //       ])
  //     ]),
  //     h('div', {
  //       backgroundColor: '#ddd',
  //       height: 101,
  //       width: 100
  //     },[
  //       123
  //     ]),
  //     h('div', {
  //       backgroundColor: 'green',
  //       height: 101,
  //       width: 100
  //     },[
  //       123
  //     ]),
  //     h('div', {
  //       backgroundColor: 'blue',
  //       backgroundImage: 'https://file.40017.cn/huochepiao/activity/20190911compensate/img/headimg.png',
  //       height: 101,
  //       width: 100
  //     },[
  //       123
  //     ]),
  //     h('div', {
  //       backgroundColor: 'yellow',
  //       height: 101,
  //       width: 100
  //     },[
  //       h('div', {
  //         backgroundColor: 'orange',
  //         height: 101,
  //         width: 100
  //       },[
  //         123
  //       ]),
  //       h('div', {
  //         backgroundColor: '#000',
  //         height: 101,
  //         width: 100
  //       },[
  //         123
  //       ])
  //     ])
  //   ])
  // }
})
app.$mount()
console.log('网页逻辑', app.$mount())
