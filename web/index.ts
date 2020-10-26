import Vue from "../src"
/**
 * 网页逻辑
 */
const app = new Vue({
  el: document.querySelector('#canvas'),
  data: {},
  render(h) {
    return h('div', {
      backgroundColor: 'pink',
    },[
      h('div', {
        backgroundColor: 'red',
        height: 300,
        overflow: 'scroll'
        // width: 200
      },[
        h('div', {
          backgroundColor: '#5ea',
          height: 400,
          width: 200
        },[
          123
        ])
      ]),
      h('div', {
        backgroundColor: '#ddd',
        height: 101,
        width: 100
      },[
        123
      ]),
      h('div', {
        backgroundColor: 'green',
        height: 101,
        width: 100
      },[
        123
      ]),
      h('div', {
        backgroundColor: 'blue',
        height: 101,
        width: 100
      },[
        123
      ]),
      h('div', {
        backgroundColor: 'yellow',
        height: 101,
        width: 100
      },[
        h('div', {
          backgroundColor: 'orange',
          height: 101,
          width: 100
        },[
          123
        ]),
        h('div', {
          backgroundColor: '#000',
          height: 101,
          width: 100
        },[
          123
        ])
      ])
    ])
  }
})
app.$mount()
console.log('网页逻辑', app.$mount())