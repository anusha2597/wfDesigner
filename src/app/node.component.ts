import { Component, Input, AfterViewInit } from "@angular/core";
import { jsPlumb } from "jsplumb";
import { SimpleModalService } from "ngx-simple-modal";
import { ActivityDialogComponent } from "./activity-dialog/activity-dialog.component";
import { AppService } from "./app.service";
import { Activity } from "./models/activity";
import { ActivityPropertyDescriptor } from "./models/activity-property-descriptor";

export interface Node {
  id: string;
  top?: number;
  left?: number;
  name: string;
  type: string;
}

@Component({
  selector: "node",
  template: `
    <div
      class="node"
      (dblclick)="editNode(node)"
      id="{{ node.id }}"
      [style.top.px]="node.top || 0"
      [style.left.px]="node.left || 20"
    >
      {{ node.name }}
      <i (click)="removeNode(node)" class="material-icons close">clear</i>
    </div>
  `,
  styles: [
    `
      .node {
        position: absolute;
        width: 100px;
        height: 50px;
        padding: 4px;
        box-shadow: 0 10px 40px 0 #b0c1d9;
        text-align: center;
      }
      .close {
        font-size: 10px;
        position: absolute;
        right: 9px;
        top: 0px;
        cursor: pointer;
      }
    `,
  ],
})
export class NodeComponent implements AfterViewInit {
  @Input() node: Activity;

  @Input() jsPlumbInstance;
  connectorFill = "#999999";
  fill = "#7da7f2";
  stroke = this.fill;
  Endpoint1 = {
    endpoint: ["Dot", { radius: 4 }],
    paintStyle: { fill: "#99cb3a" },
    isSource: true,
    scope: "jsPlumb_DefaultScope",
    connectorStyle: { strokeWidth: 2, stroke: this.connectorFill },
    connector: [
      "Flowchart",
      { stub: [40, 60], gap: 0, cornerRadius: 5, alwaysRespectStubs: true },
    ],
    hoverPaintStyle: {
      fill: this.stroke,
      stroke: this.fill,
    },
    maxConnections: 1,
    reattachConnections: true,
    isTarget: false,
    connectorOverlays: [["Arrow", { location: 1 }]],
    //dropOptions: this.exampleDropOptions,
    DragOptions: {},
  };
  Endpoint2 = {
    endpoint: ["Dot", { radius: 4 }],
    paintStyle: { fill: "#ffcb3a" },
    isSource: false,
    scope: "jsPlumb_DefaultScope",
    connectorStyle: { strokeWidth: 2, stroke: this.connectorFill },
    connector: [
      "Flowchart",
      { stub: [40, 60], gap: 0, cornerRadius: 5, alwaysRespectStubs: true },
    ],
    maxConnections: 1,
    reattachConnections: true,
    isTarget: true,
    //dropOptions: this.exampleDropOptions,
    DragOptions: {},
  };
  constructor(
    private simpleModalService: SimpleModalService,
    private appService: AppService
  ) {}

  ngAfterViewInit() {
    const exampleDropOptions = {
      tolerance: "touch",
      hoverClass: "dropHover",
      activeClass: "dragActive",
    };

    const { id } = this.node;
    if (this.node.type !== "end") {
      this.jsPlumbInstance.addEndpoint(
        id,
        { anchor: "Continuous", uuid: id + "source" },
        this.Endpoint1
      );
    }
    if (this.node.type !== "start") {
      this.jsPlumbInstance.addEndpoint(
        id,
        { anchor: "Continuous", uuid: id + "dest" },
        this.Endpoint2
      );
    }
    this.jsPlumbInstance.draggable(id, {
      helper: "clone",
      cursor: "pointer",
      tolerance: "fit",
    });
  }

  removeNode(node) {
    this.jsPlumbInstance.removeAllEndpoints(node.id);
    this.jsPlumbInstance.remove(node.id);
  }

  getActivityProperties(type: string) {
    return this.appService.activity_definitions.find(
      (activity) => activity.type === type
    ).properties;
  }

  updateActivityDefinition(
    type: string,
    properties: Array<ActivityPropertyDescriptor>
  ) {
    this.appService.activity_definitions.find(
      (activity) => activity.type === type
    ).properties = properties;
  }

  editNode(node) {
    if (node.type !== "start" && node.type !== "end") {
      this.simpleModalService
        .addModal(ActivityDialogComponent, {
          title: "Configure",
          questions: { name: node.name, type: node.type },
          properties: this.getActivityProperties(node.type),
        })
        .subscribe((result) => {
          if (result !== undefined) {
            this.updateActivityDefinition(node.type, result);
          }
        });
    }
  }
}
