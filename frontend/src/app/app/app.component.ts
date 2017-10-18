import { FilterComponent } from '../filter/filter.component';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MatchFilter, Person } from '../../../../data/person';
import { PeopleService } from '../people.service';
import { MatDialog, MatSnackBar } from '@angular/material';

interface City { name: string; lat: number; lon: number }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [PeopleService],
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private peopleService: PeopleService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  peopleList: Person[] = []

  ngOnInit(): void {
    this.getPeople()
  }

  getPeople = () => {
    this.peopleService.getPeople(this.filter, this.currentLocation)
      .then(this.setPeople)
      .then(this.setLocations.bind(this))
  }

  locations: City[] = []
  currentLocation: City = null

  setLocations = () => {
    const locations = {}
    for (let { city } of this.peopleList) {
      locations[city.name] = city
    }
    this.locations = Object.keys(locations).map(key => locations[key])
  }

  setLocation = (location: City) => {
    this.currentLocation = location
  }

  setFilter = (filter: MatchFilter) => {
    if (filter) this.filter = filter

    if (this.filter.distance && !this.currentLocation) {
      this.snackBar.open("Cannot filter by distance from nowhere", undefined, { duration: 3000 })
      this.filter.distance = null
    }

    this.getPeople()
  }

  setPeople = (people: Person[]) => {
    this.peopleList = people
    this.dataSource = new PeopleDataService(people)
  }

  displayedColumns = ['display_name', 'job_title', 'age', 'city_name'];
  dataSource = new PeopleDataService([]);

  filter: MatchFilter = {
    has_photo: null,
    in_contact: null,
    is_favourite: null,
    height: {
      from: 135,
      to: null
    },
    age: {
      from: 18,
      to: null
    },
    compatibility_score: {
      from: 1,
      to: 99
    },
    distance: null
  }

  onFilter() {
    let dialogRef = this.dialog.open(FilterComponent, {
      width: '450px',
      data: this.filter
    })

    dialogRef.afterClosed().subscribe(value => this.setFilter(value))
  }

  goReact() {
    document.location.href = '/react'
  }
}

export class PeopleDataService extends DataSource<Person> {
  constructor(private data: Person[]) {
    super()
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Person[]> {
    return Observable.of(this.data);
  }

  disconnect() { }
}
