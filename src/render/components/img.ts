// text组件

import { EventTrigger } from "../../common/event";
import { RealElement } from "../element";
import DIV, { renderDIV } from "./div";
import Vue from '../../vue'
export default class TEXT extends DIV {
  constructor(public element: RealElement, public vm: Vue) {
    super(element, vm)
    const { src } = element.attrs.attrs
    element.attrs.attrs.src = ''
    this.styles.backgroundImage = `url("${src}")`
  }
  render() {
    // debugger
    super.render()
  }
}