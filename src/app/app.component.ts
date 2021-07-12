import { Component, AfterContentInit, OnInit, ViewChild } from "@angular/core";
import { NodeService } from "./node.service";
import * as $ from "jquery";
import { AppService } from "./app.service";
import { ActivityDefinition } from "./models/activity-definition";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
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
    private appService: AppService
  ) {}

  ngOnInit() {
    this.fillFromJson();
    this.nodeService.jsPlumbInstance.setContainer(this.dropArea);
  }

  fillFromJson() {
    //const json = `{"nodes":[{"id":"Step_0 id: b46a17","top":177,"left":146},{"id":"Step_1 id: efd2ce","top":302,"left":130},{"id":"Step id_2eb091","top":41,"left":158}],"connections":[{"uuids":["Step_0 id: b46a17_bottom","Step_1 id: efd2ce_top"]},{"uuids":["Step id_2eb091_bottom","Step_0 id: b46a17_top"]}]}`;
    //const json = `{"nodes":[{"id":"Node0","top":38,"left":26},{"id":"Node1","top":210,"left":28},{"id":"Node2","top":126,"left":163},{"id":"Node3","top":123,"left":29},{"id":"Node4","top":210,"left":162},{"id":"Node5","top":293,"left":27},{"id":"Node6","top":37,"left":166}],"connections":[]}`;
    //const json = `{"nodes":[{"id":"Node0","top":91,"left":514,"name":"Start","type":"start"},{"id":"Node1","top":210,"left":28,"name":"Database","type":"ReadLine"},{"id":"Node2","top":10,"left":701,"name":"Program Command","type":"ReadLine"},{"id":"Node3","top":36,"left":1003,"name":"SFTP","type":"ReadLine"},{"id":"Node4","top":210,"left":162,"name":"Map","type":"ReadLine"},{"id":"Node5","top":293,"left":27,"name":"Salesforce","type":"ReadLine"},{"id":"Node6","top":37,"left":166,"name":"End","type":"end"}],"connections":[{"uuids":["Node0source","Node2dest"]},{"uuids":["Node2source","Node3dest"]}]}`;
    //const data = JSON.parse(json);
    this.appService.getWorkflow().subscribe((data) => {
      this.appService.activity_definitions = <Array<ActivityDefinition>>(
        data.activities
      );
      this.nodes = data.nodes;
      this.connections = data.connections;
    });
  }
}
