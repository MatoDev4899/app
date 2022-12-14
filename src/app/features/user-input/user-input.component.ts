import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { City } from 'src/app/shared/models/City.model';
import { DateService } from '../../core/services/date.service';
import { UserInputService } from './user-input.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
})
export class UserInputComponent implements OnInit {
  cities: City[];
  userInput: FormGroup;

  constructor(
    private dateService: DateService,
    private userInputService: UserInputService
  ) {}

  ngOnInit(): void {
    this.cities = [
      new City('London', '51.51', '-0.13'),
      new City('Sydney', '-33.87', '151.21'),
      new City('New York', '40.71', '-74.01'),
      new City('Paris', '48.85', '2.35'),
      new City('Tokyo', '35.69', '139.69'),
      new City('Bratislava', '48.15', '17.11'),
    ];

    this.userInput = new FormGroup({
      selectedCity: new FormControl(null),
      selectedDate: new FormControl(null),
    });

    this.userInputService.setStoredCityAndDate(
      this.selectedCity,
      this.selectedDate
    );
    this.userInputService.onCityChange(this.selectedCity, this.selectedDate);
    this.dateService.watchForStoredDate();
  }

  onDateSelect(): void {
    this.dateService.submitDates(this.userInput);
  }

  get minDate(): Date {
    return this.dateService.minDate;
  }

  get maxDate(): Date {
    return this.dateService.maxDate;
  }

  private get selectedDate(): AbstractControl {
    return this.userInput.controls['selectedDate'];
  }

  private get selectedCity(): AbstractControl {
    return this.userInput.controls['selectedCity'];
  }
}
