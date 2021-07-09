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

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    DialogComponent,
    NodesContainerComponent,
  ],
  entryComponents: [DialogComponent, NodeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SimpleModalModule.forRoot({ container: "modal-container" }),
  ],
  providers: [NodeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
