import { Component, Input } from "@angular/core";
import { ActivityPropertyDescriptor } from "../models/activity-property-descriptor";

@Component({
  selector: "wf-text-field",
  template: `<div>
    <label>{{ fieldInfo.label }}</label>
    <input
      id="{{ fieldInfo.name }}"
      name="{{ fieldInfo.name }}"
      type="text"
      class="form-control"
      placeholder="{{ fieldInfo.label }}"
      value="{{ fieldInfo.value }}"
    />
  </div>`,
})
export class TextField {
  @Input() fieldInfo: ActivityPropertyDescriptor;
}
