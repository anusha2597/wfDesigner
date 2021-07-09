import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  ViewContainerRef,
  ViewChild,
} from "@angular/core";
import { NodeService } from "./node.service";
import { SimpleModalService } from "ngx-simple-modal";
import { DialogComponent } from "./dialog.component";

@Component({
  selector: "nodes-container",
  templateUrl: "./nodes-container.component.html",
  styleUrls: ["./nodes-container.component.css"],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodesContainerComponent implements OnInit, AfterViewInit {
  @Input() nodes = [];

  @Input() connections = [];

  @ViewChild("nodes", { read: ViewContainerRef, static: true })
  viewContainerRef: ViewContainerRef;

  constructor(
    private nodeService: NodeService,
    private simpleModalService: SimpleModalService
  ) {}

  ngOnInit() {
    this.nodeService.setRootViewContainerRef(this.viewContainerRef);

    this.nodes.forEach((node) => {
      this.nodeService.addDynamicNode(node);
    });

    setTimeout(() => {
      this.connections.forEach((connection) => {
        this.nodeService.addConnection(connection);
      });
    });
  }

  ngAfterViewInit() {
    // this.nodeService.jsPlumbInstance.bind("connection", (info) => {
    //   this.simpleModalService
    //     .addModal(DialogComponent, {
    //       title: "Dialog",
    //       questions: { name: "", type: "" },
    //     })
    //     .subscribe((result) => {
    //       const targetNode = this.nodes.find(
    //         (node) => node.id === info.targetId
    //       );
    //       if (targetNode) {
    //         targetNode.name = result.name;
    //         targetNode.type = result.type;
    //         if (targetNode.type === "end") {
    //           this.nodeService.jsPlumbInstance.deleteEndpoint(
    //             info.targetId + "right"
    //           );
    //         }
    //       }
    //     });
    // });
  }
  // addNode() {
  //   const node = { id: "Step id_" + [Math.random().toString(16).slice(2, 8)] };

  //   this.nodeService.addDynamicNode(node);
  // }

  saveNodeJson() {
    //save element position on Canvas and node conections

    const container = this.viewContainerRef.element.nativeElement.parentNode;
    const nodes = Array.from(container.querySelectorAll(".node")).map(
      (node: HTMLDivElement) => {
        return {
          id: node.id,
          top: node.offsetTop,
          left: node.offsetLeft,
        };
      }
    );

    const connections = (this.nodeService.jsPlumbInstance.getAllConnections() as any[]).map(
      (conn) => ({ uuids: conn.getUuids() })
    );

    const json = JSON.stringify({ nodes, connections });

    console.log(json);
  }
}
