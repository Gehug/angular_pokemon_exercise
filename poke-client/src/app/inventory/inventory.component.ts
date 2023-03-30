import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {InvetoryResults} from "../models/inventoryAPI";
import {PageResults} from "../models/page";
import {PokeData} from "../models/pokemon";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  public pokemons: Array<PokeData>;


  constructor(private httpClient:HttpClient) {
    this.pokemons = [];
  }

  ngOnInit(): void {





    let inventory:Observable<Array<PokeData>> = this.httpClient.get<Array<PokeData>>("http://127.0.0.1:3001/inventory");

    inventory.subscribe((response: Array<PokeData>) => {


      console.log(response);


      this.pokemons = response;

      });
  }

}
