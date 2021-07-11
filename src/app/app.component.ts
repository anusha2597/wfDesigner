import { Component, AfterContentInit, OnInit, ViewChild } from "@angular/core";
import { NodeService } from "./node.service";
import * as $ from "jquery";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("dropArea", { static: true }) dropArea;
  nodes = [
    { id: "Node0", name: "Start", top: 38, left: 26, type: "start" },
    { id: "Node1", name: "Database", top: 210, left: 28, type: "" },
    { id: "Node2", name: "Program Command", top: 126, left: 163, type: "" },
    { id: "Node3", name: "SFTP", top: 123, left: 29, type: "" },
    { id: "Node4", name: "Map", top: 210, left: 162, type: "" },
    { id: "Node5", name: "Salesforce", top: 293, left: 27, type: "" },
    { id: "Node6", name: "End", top: 37, left: 166, type: "end" },
  ];

  connections = [];

  constructor(private nodeService: NodeService,private router: Router) {}

  ngOnInit() {
    this.fillFromJson();
    this.nodeService.jsPlumbInstance.setContainer(this.dropArea);
  }

  fillFromJson() {
    //const json = `{"nodes":[{"id":"Step_0 id: b46a17","top":177,"left":146},{"id":"Step_1 id: efd2ce","top":302,"left":130},{"id":"Step id_2eb091","top":41,"left":158}],"connections":[{"uuids":["Step_0 id: b46a17_bottom","Step_1 id: efd2ce_top"]},{"uuids":["Step id_2eb091_bottom","Step_0 id: b46a17_top"]}]}`;
    const json = `{"nodes":[{"id":"Node0","top":38,"left":26},{"id":"Node1","top":210,"left":28},{"id":"Node2","top":126,"left":163},{"id":"Node3","top":123,"left":29},{"id":"Node4","top":210,"left":162},{"id":"Node5","top":293,"left":27},{"id":"Node6","top":37,"left":166}],"connections":[]}`;
    const data = JSON.parse(json);

    //this.nodes = data.nodes;
    //this.connections = data.connections;
  }
  goToProfileMapping(){
    this.router.navigate(['/mapping']);
  }
}
