import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NodeComponent } from "./node.component";
import { NodeService } from "./node.service";
import { SimpleModalModule } from "ngx-simple-modal";
import { FormsModule } from "@angular/forms";
import { NodesContainerComponent } from "./nodes-container/nodes-container.component";
import { ActivityDialogComponent } from "./activity-dialog/activity-dialog.component";
import { AppService } from "./app.service";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MappingHomeComponent } from "./mapping/mapping-home/mapping-home.component";
import { MappingNodeComponent } from "./mapping/mapping-node/mapping-node.component";
import { DynamicNodeComponent } from "./mapping/mapping-dynamic-node.component";
import { MappingNodeService } from "./mapping/mapping-node.service";
import { Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    NodesContainerComponent,
    ActivityDialogComponent,
    MappingHomeComponent,
    MappingNodeComponent,
    DynamicNodeComponent,
    HomeComponent,
  ],
  entryComponents: [
    NodeComponent,
    ActivityDialogComponent,
    DynamicNodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SimpleModalModule.forRoot({ container: "modal-container" }),
  ],
  providers: [NodeService, AppService, MappingNodeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
