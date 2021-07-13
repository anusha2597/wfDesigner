import { Component, AfterContentInit, OnInit, ViewChild } from "@angular/core";
import { NodeService } from "./node.service";
import * as $ from "jquery";
import { AppService } from "./app.service";
import { ActivityDefinition } from "./models/activity-definition";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("dropArea", { static: true }) dropArea;
  nodes = [];

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
