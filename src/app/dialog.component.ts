import { Component } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";

export interface DialogModel {
  title: string;
  questions: { name: ""; type: "" };
}

@Component({
  selector: "app-dialog",
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <h4>{{ title }}</h4>
      </div>
      <div class="modal-body">
        <label>Name</label>
        <input
          type="text"
          class="form-control"
          [(ngModel)]="questions['name']"
          name="name"
        />
        <label>Type</label>
        <select [(ngModel)]="questions['type']">
          <option value="middle">Middle</option>
          <option value="end">End</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger" (click)="close()">
          Cancel
        </button>
        <button type="button" class="btn btn-primary" (click)="apply()">
          Save
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .modal {
        background-color: rgba(0, 0, 0, 0.4);
        bottom: 0;
        height: 100%;
        left: 0;
        outline: 0;
        overflow: auto;
        padding: 0 16px;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 10;
        text-align: center;
      }
      .modal.fade-anim {
        opacity: 0;
        will-change: opacity;
      }
      .modal.fade-anim .modal-content {
        transform: translate(0, -25%);
        will-change: transform;
      }
      .modal.in .modal-content {
        transform: translate(0, 0);
      }
      .modal.fade-anim.in {
        opacity: 1;
      }
      .modal-open {
        overflow: hidden;
      }
      .modal-content {
        background-color: #fff;
        border-radius: 4px;
        margin: 16px auto;
        max-width: 580px;
        position: relative;
        width: 100%;
        will-change: opacity;
        display: inline-block;
        text-align: left;
      }
      .modal-content-size-m {
        max-width: 992px;
      }
      .modal-content-size-l {
        max-width: 1200px;
      }
      .modal-header,
      .modal-footer {
        align-items: center;
        display: flex;
        height: 56px;
        padding: 0 16px;
      }
      .modal-header {
        border-bottom: 1px solid #cecece;
        justify-content: center;
      }
      .modal-header h3 {
        color: inherit;
      }
      .modal-body {
        padding: 16px;
      }
      .modal-footer {
        border-top: 1px solid #cecece;
        justify-content: flex-end;
      }
      .modal-footer .btn {
        margin: 0 0 0 8px;
      }
    `,
  ],
})
export class DialogComponent
  extends SimpleModalComponent<DialogModel, DialogModel["questions"]>
  implements DialogModel {
  title: string;
  questions: { name: ""; type: "" };
  constructor() {
    super();
  }

  apply() {
    this.result = this.questions;
    this.close();
  }
}
