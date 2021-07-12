import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivityDefinition } from "./models/activity-definition";

@Injectable()
export class AppService {
  activity_definitions: Array<ActivityDefinition>;
  mappings: any;

  constructor(private http: HttpClient) {}

  getWorkflow(): Observable<any> {
    return this.http.get<any>("/assets/workflow.json");
  }
}
