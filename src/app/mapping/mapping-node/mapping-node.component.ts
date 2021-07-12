import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { DialogComponent } from 'src/app/dialog.component';
import { MappingNodeService } from '../mapping-node.service';

@Component({
  selector: 'app-mapping-node',
  templateUrl: './mapping-node.component.html',
  styleUrls: ['./mapping-node.component.css']
})
export class MappingNodeComponent implements OnChanges, AfterViewInit {

  @Input() nodes;
  @ViewChild('nodes', { read: ViewContainerRef, static: true })
  viewContainerRef: ViewContainerRef;
  constructor(private nodeService: MappingNodeService, private simpleModalService: SimpleModalService) {
  }

  ngAfterViewInit() {
    this.nodeService.jsPlumbInstance.bind('connection', info => {
      this.simpleModalService.addModal(DialogComponent, {
        title: 'Dialog',
        questions: { name: '', type: ''}})
        .subscribe((result) => {
          const targetNode = this.nodes.find(node => node.id === info.targetId);
          if (targetNode) {
            targetNode.name = result.name;
            targetNode.type = result.type;
            if (targetNode.type === 'end') {
            this.nodeService.jsPlumbInstance.deleteEndpoint(info.targetId + 'right');
        }
      }
        });
   });
  }

  ngOnChanges() {
    this.nodeService.setRootViewContainerRef(this.viewContainerRef);
    this.nodeService.clear();
    if (this.nodes.length > 0) {
      this.nodes.forEach(node => {
        this.nodeService.addDynamicNode(node);
      });
    }
    
  }

}
