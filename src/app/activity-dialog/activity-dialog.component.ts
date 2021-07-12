import { Component, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { ActivityPropertyDescriptor } from "../models/activity-property-descriptor";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

export interface DialogModel {
  title: string;
  questions: { name: ""; type: "" };
  properties: Array<ActivityPropertyDescriptor>;
}

@Component({
  selector: "app-activity-dialog",
  templateUrl: "./activity-dialog.component.html",
  styleUrls: ["./activity-dialog.component.css"],
})
export class ActivityDialogComponent
  extends SimpleModalComponent<DialogModel, DialogModel["properties"]>
  implements OnInit, DialogModel {
  title: string;
  questions: { name: ""; type: "" };
  properties: Array<ActivityPropertyDescriptor>;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.profileForm = this.fb.group({});
    for (let property of this.properties) {
      this.profileForm.addControl(property.name, new FormControl(""));
      this.profileForm.controls[property.name].setValue(property.value);
    }
  }

  onSubmit(e: any) {
    console.log(this.profileForm.value);
    this.updateActivityDefinition();
    this.result = this.properties;
    this.close();
  }

  updateActivityDefinition() {
    for (let property of this.properties) {
      property.value = this.profileForm.value[property.name];
    }
  }
}
