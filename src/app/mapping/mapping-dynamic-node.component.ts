import { Component, Input, AfterViewInit, OnChanges } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { jsPlumb } from "jsplumb";

export interface Node {
  id: string;
  name: string;
  type: string;
}

@Component({
  selector: "app-dynamic-node",
  template: ` <div
    (dblclick)="editNode(node)"
    class="node"
    id="{{ node.id }}"
    style="top: 0; left: 50%;"
  >
    {{ node.name }}
    <i (click)="removeNode(node)" class="material-icons close">clear</i>
  </div>`,
  styles: [
    `
      .node {
        position: relative;
        width: 100px;
        height: 30px;
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
export class DynamicNodeComponent implements AfterViewInit {
  @Input() node: Node;
  @Input() jsPlumbInstance;
  sourceEndPoint: any;
  connectorFill = "#999999";
  fill = "#7da7f2";
  stroke = this.fill;
  destinationEndPoint: any;
  exampleDropOptions = {
    tolerance: "touch",
    hoverClass: "dropHover",
    activeClass: "dragActive",
  };
  source = {
    endpoint: ["Dot", { radius: 4 }],
    paintStyle: { fill: "#99cb3a" },
    isSource: true,
    scope: "jsPlumb_DefaultScope",
    hoverPaintStyle: {
      fill: this.stroke,
      stroke: this.fill,
    },
    connectorStyle: { stroke: this.connectorFill, strokeWidth: 2 },
    connector: [
      "Flowchart",
      { stub: [40, 60], gap: 0, cornerRadius: 5, alwaysRespectStubs: true },
    ],
    maxConnections: 1,
    isTarget: false,
    connectorOverlays: [["Arrow", { location: 1 }]],
    dropOptions: this.exampleDropOptions,
  };
  destination = {
    endpoint: ["Dot", { radius: 4 }],
    paintStyle: { fill: "#ffcb3a" },
    isSource: false,
    scope: "jsPlumb_DefaultScope",
    connectorStyle: { stroke: this.connectorFill, strokeWidth: 2 },
    connector: [
      "Flowchart",
      { stub: [40, 60], gap: 0, cornerRadius: 5, alwaysRespectStubs: true },
    ],
    maxConnections: 1,
    isTarget: true,
    dropOptions: this.exampleDropOptions,
  };
  constructor(private simpleModalService: SimpleModalService) {}
  ngAfterViewInit() {
    if (this.node.type !== "Destination" && this.node.type !== "label") {
      this.sourceEndPoint = this.jsPlumbInstance.addEndpoint(
        this.node.id,
        { anchor: "Right", uuid: this.node.id + "right" },
        this.source
      );
    }
    if (this.node.type !== "Source" && this.node.type !== "label") {
      this.destinationEndPoint = this.jsPlumbInstance.addEndpoint(
        this.node.id,
        { anchor: "Left", uuid: this.node.id + "left" },
        this.destination
      );
    }
    //this.jsPlumbInstance.draggable(this.node.id);
  }

  removeNode(node) {
    this.jsPlumbInstance.removeAllEndpoints(node.id);
    this.jsPlumbInstance.remove(node.id);
  }

  editNode(node) {
    // this.simpleModalService.addModal(DialogComponent, {
    //   title: 'Dialog',
    //   questions: { name: node.name, type: node.type }
    // })
    //   .subscribe((result) => {
    //     this.node.name = result.name;
    //     this.node.type = result.type;
    //     if (node.type === 'end') {
    //       this.jsPlumbInstance.deleteEndpoint(node.id + 'right');
    //     } else {
    //       this.jsPlumbInstance.addEndpoint(this.node.id,
    //         { anchor: 'Right', uuid: this.node.id + 'right' }, this.source);
    //     }
    //   });
  }
}
