import { MatchFilter } from '../../../../data/person';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Input()
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  constructor(public dialogRef: MatDialogRef<FilterComponent>, @Inject(MAT_DIALOG_DATA) public data: MatchFilter) {
  }

  _dataView: {
    has_photo: boolean
    is_favourite: boolean
    in_contact: boolean

    compatibility_score: [number, number]
    age: [number, number]
    height: [number, number]

    distance: number
  }

  get dataView() {
    if (!this._dataView) this._dataView = {
      has_photo: this.data.has_photo,
      is_favourite: this.data.is_favourite,
      in_contact: this.data.in_contact,

      compatibility_score: [this.data.compatibility_score.from, this.data.compatibility_score.to],
      age: [this.data.age.from, this.data.age.to || 100],
      height: [this.data.height.from, this.data.height.to || 211],

      distance: this.data.distance || 301
    }

    return this._dataView
  }

  get filterModel(): MatchFilter {
    return {
      has_photo: this.dataView.has_photo,
      is_favourite: this.dataView.is_favourite,
      in_contact: this.dataView.in_contact,

      compatibility_score: {
        from: this.dataView.compatibility_score[0],
        to: this.dataView.compatibility_score[1],
      },
      age: {
        from: this.dataView.age[0],
        to: this.dataView.age[1] == 100 ? null : this.dataView.age[1]
      },
      height: {
        from: this.dataView.height[0],
        to: this.dataView.height[1] == 211 ? null : this.dataView.height[1]
      },
      distance: this.dataView.distance == 301 ? null : this.dataView.distance
    }
  }

  get has_photo_indeterminate() {
    return this.dataView.has_photo == null
  }

  get is_favourite_indeterminate() {
    return this.dataView.is_favourite == null
  }

  get in_contact_indeterminate() {
    return this.dataView.in_contact == null
  }

  get ageDescription() {
    if (this.dataView.age[1] && this.dataView.age[1] != 100)
      return `${this.dataView.age[0]} to ${this.dataView.age[1]} years old`
    else
      return `${this.dataView.age[0]}+ years old`
  }
  get heightDescription() {
    if (this.dataView.height[1] && this.dataView.height[1] != 211)
      return `${this.dataView.height[0]} to ${this.dataView.height[1]} centimeters`
    else
      return `${this.dataView.height[0]}+ centimeters`
  }
  get distanceDescription() {
    return `${((this.dataView.distance && this.dataView.distance != 301) ? this.dataView.distance : '300+')} km`
  }
}
