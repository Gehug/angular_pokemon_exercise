import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PokeData, Sprites} from "../models/pokemon";

import {PageResults, Page} from "../models/page";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  // public test:PokeData;


  // private pokemonsURLs: Array<string>

  public pokemons: Array<PokeData>
  private maxPerPage: number;
  private offset: number;
  public currentPage: number;
  public maxPage: number;


  constructor(private httpClient:HttpClient) {


    this.maxPerPage = 20;
    this.offset = 0; // Offset betekend vanaf welke ID de ip de 20 begint te tellen: bvb: offset = 13 & maxPer_page = 20 --> pokemon 14, 15, 16, ... , 33 worden getoont
    // this.pokemonsURLs = []; // lijst met alle urls van de pokemons API --> deze url geeft meer informatie over de pokemon.
    this.currentPage = 1;
    this.maxPage = 1160/20+1;





  }

  ngOnInit(): void {

    this.getPokemons();









  }


  public getPokemons():void {
    this.pokemons = []; // Maakt lijst met alle pokemons leeg

    let getPage:Observable<PageResults> = this.httpClient.get<PageResults>(`https://pokeapi.co/api/v2/pokemon?limit=${this.maxPerPage}&offset=${this.offset}`);

    getPage.subscribe((response:PageResults) => {



      for (let i:number = 0; i < response.results.length; i++) {

        // this.pokemonsURLs.push(response.results[i].url);
        let getPokemons: Observable<PokeData> = this.httpClient.get<PokeData>(response.results[i].url);

        getPokemons.subscribe((response2: PokeData) => {

          console.log(response2.name);

          this.pokemons.push(response2);

          // console.log(response.name, response.id, response.sprites);
        });


      }

    });
  }


  public pageUp() {

    if (this.offset < 1154) {
      this.offset += 20;
      this.getPokemons();
    }

    this.currentPage = this.offset / 20 + 1;




  }

  public pageDown() {

    if (this.offset > 0) {
      this.offset -= 20
      this.getPokemons();
    }

    this.currentPage = this.offset / 20 + 1;

  }

  public catchPokemon(pokemon: PokeData):void {
    console.log(pokemon.name + " has been catch!");

    let postCatch:Observable<any> = this.httpClient.post<any>("http://127.0.0.1:3001/inventory", {"name": pokemon.name, "id": pokemon.id, "sprite": pokemon.sprites.front_default});

    postCatch.subscribe(() => {
      console.log("Added to server");
    });
  }



}
