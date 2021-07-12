import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { MappingNodeService } from "../mapping-node.service";

@Component({
  selector: "app-mapping-node",
  templateUrl: "./mapping-node.component.html",
  styleUrls: ["./mapping-node.component.css"],
})
export class MappingNodeComponent implements OnChanges, AfterViewInit {
  @Input() nodes;
  @Input() connections;
  @Output() mappingJson = new EventEmitter<{mapData : string}>();
  @ViewChild('nodes', { read: ViewContainerRef, static: true })
 
  viewContainerRef: ViewContainerRef;
  constructor(
    private nodeService: MappingNodeService,
    private simpleModalService: SimpleModalService
  ) {}

  ngAfterViewInit() {
    //   this.nodeService.jsPlumbInstance.bind('connection', info => {
    //     this.simpleModalService.addModal(DialogComponent, {
    //       title: 'Dialog',
    //       questions: { name: '', type: ''}})
    //       .subscribe((result) => {
    //         const targetNode = this.nodes.find(node => node.id === info.targetId);
    //         if (targetNode) {
    //           targetNode.name = result.name;
    //           targetNode.type = result.type;
    //           if (targetNode.type === 'end') {
    //           this.nodeService.jsPlumbInstance.deleteEndpoint(info.targetId + 'right');
    //       }
    //     }
    //       });
    //  });
  }

  ngOnChanges() {
    this.nodeService.setRootViewContainerRef(this.viewContainerRef);
    this.nodeService.clear();
    if (this.nodes.length > 0) {
      this.nodes.forEach((node) => {
        this.nodeService.addDynamicNode(node);
      });
    }
  }
  saveNodeJson() {
    //save element position on Canvas and node conections

    const container = this.viewContainerRef.element.nativeElement.ownerDocument;
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

    this.mappingJson.emit({mapData:JSON.stringify({ nodes, connections })});

    //console.log(json);
  }
}
