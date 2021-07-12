import { Component, OnInit } from '@angular/core';
import { ProductModeldst } from '../Models/ProductModeldst';
import { ProductModelsrc } from '../Models/ProductModelsrc';

@Component({
  selector: 'app-mapping-home',
  templateUrl: './mapping-home.component.html',
  styleUrls: ['./mapping-home.component.css']
})
export class MappingHomeComponent implements OnInit {

  title = ' Angular jsPlumb Integration';
  srcNodes = [{id: 'sNode0', name: 'Source Profile', type: 'label'}];
  dstNodes = [{id: 'sNode0', name: 'Destination Profile', type: 'label'}];
  index = 0;
  srcPdt : ProductModelsrc;
  dstPdt : ProductModeldst;
  connections = [];

  ngOnInit() {
    this.srcPdt = {sId:1,sCountry:"India",sPrice:20, sDescription:"good product",sManufacturer:"Agility",sName:"Product1"};
    this.dstPdt = {dId:1,dCountry:"India",dPrice:20,dDescription:"good product",dManufacturer:"Agility",dName:"Product1"};
    this.addNode();
  }
  getSavedJson(data:{mapData :string}):void{
    const mapData = JSON.parse(data.mapData);

    //this.nodes = mapData.nodes;
    this.connections = mapData.connections;
  }
  addNode() {
    for (var property in this.srcPdt) {
      if (this.srcPdt.hasOwnProperty(property)) {
        this.srcNodes.push({id : property ,
                            name:property ,
                                  type: 'Source'});
      }
  }
  for (var property in this.dstPdt) {
    if (this.dstPdt.hasOwnProperty(property)) {
      this.dstNodes.push({id : property ,
                          name:property ,
                                type: 'Destination'});
    }
  }
}

}
