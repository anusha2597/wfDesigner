import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NodeComponent } from "./node.component";
//import { NodeService } from "./node/node.service";
import { NodeService } from "./node.service";
import { SimpleModalModule } from "ngx-simple-modal";
import { DialogComponent } from "./dialog.component";
import { FormsModule } from "@angular/forms";
import { NodesContainerComponent } from "./nodes-container.component";
import { MappingHomeComponent } from './mapping/mapping-home/mapping-home.component';
import { MappingNodeComponent } from './mapping/mapping-node/mapping-node.component';
import { DynamicNodeComponent } from "./mapping/mapping-dynamic-node.component";
import { MappingNodeService } from "./mapping/mapping-node.service";
import { Routes } from "@angular/router";

@NgModule({
  
  declarations: [
    AppComponent,
    NodeComponent,
    DialogComponent,
    NodesContainerComponent,
    MappingHomeComponent,
    MappingNodeComponent,
    DynamicNodeComponent
  ],
  entryComponents: [DialogComponent, NodeComponent,DynamicNodeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SimpleModalModule.forRoot({ container: "modal-container" }),
  ],
  providers: [NodeService,MappingNodeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
