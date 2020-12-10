// text组件

import { EventTrigger } from "../../common/event";
import { RealElement } from "../element";
import DIV, { renderDIV } from "./div";
import Vue from '../../vue'
export default class TEXT extends DIV {
  constructor(public element: RealElement, public vm: Vue) {
    super(element, vm)
  }
  render() {
    // debugger
    super.render()
    // const createElement = this.vm.$createElement
    // const content = this.element.value
    // const style = this.element.attrs.style
    // const children = this.element.children.slice()
    // const element = createElement('div', {
    //   ...this.element.attrs,
    //   style: {
    //     display: 'inline',
    //     ...style,
    //     content,
    //   }
    // }, children)
    // debugger
    // this.element.children.push(element)
    // // debugger
    // renderDIV(element, this.vm)
  }
}