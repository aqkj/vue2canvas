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
  }
}