// text组件

import { EventTrigger } from "../../common/event";
import { RealElement } from "../element";
import { renderDIV } from "./div";
import Vue from '../../vue'
export default class TEXT extends EventTrigger {
  constructor(public element: RealElement, public vm: Vue) {
    super()
  }
  render() {
    const createElement = this.vm.$createElement
    const content = this.element.value
    const style = this.element.attrs.style
    const element = createElement('div', {
      ...this.element.attrs,
      style: {
        ...style,
        content,
      }
    }, this.element.children)
    // debugger
    renderDIV(element, this.vm)
  }
}