import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ActivityDefinition } from '../models/activity-definition';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild("dropArea", { static: true }) dropArea;
  nodes = [];
  // nodes = [
  //   { id: "Node0", name: "Start", top: 38, left: 26, type: "start" },
  //   { id: "Node1", name: "Database", top: 210, left: 28, type: "Database" },
  //   {
  //     id: "Node2",
  //     name: "Program Command",
  //     top: 126,
  //     left: 163,
  //     type: "ProgramCommand",
  //   },
  //   {
  //     id: "Node3",
  //     name: "Http Request",
  //     top: 293,
  //     left: 163,
  //     type: "SendHttpRequest",
  //   },
  //   { id: "Node4", name: "SFTP", top: 123, left: 29, type: "SFTP" },
  //   { id: "Node5", name: "Map", top: 210, left: 162, type: "ReadLine" },
  //   { id: "Node6", name: "Salesforce", top: 293, left: 27, type: "Salesforce" },
  //   { id: "Node7", name: "End", top: 37, left: 166, type: "end" },
  // ];

  connections = [];

  constructor(
    private nodeService: NodeService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fillFromJson();
    this.nodeService.jsPlumbInstance.setContainer(this.dropArea);
  }

  fillFromJson() {
    this.appService.getWorkflow().subscribe((data) => {
      this.appService.activity_definitions = <Array<ActivityDefinition>>(
        data.workflow.activities
      );
      this.nodes = data.workflow.nodes;
      this.connections = data.workflow.connections;
      this.appService.mappings = data.mappings;
    });
  }

  goToProfileMapping() {
    this.router.navigate(["/mapping"]);
  }

}
