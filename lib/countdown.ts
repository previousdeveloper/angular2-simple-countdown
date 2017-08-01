import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import Timer = NodeJS.Timer;

@Component({
  selector: 'count-down',
  template: `<h1>{{displayString}}</h1><ng-content></ng-content>`
})
export class CountDown implements OnInit {

  _to: Timer;

  @Input()
  units: any;

  @Input()
  end: any;

  @Input()
  text: any;

  @Output()
  endCount = new EventEmitter();

  givenDate: any;
  displayString: string;

  constructor() {
  }

  ngOnInit(): void {

    if (typeof this.units === 'string') {
      this.units = this.units.toLowerCase().split('|');
    }

    this.givenDate = new Date(this.end);

    if (!this.text) {
      this.text = {
        'Weeks': 'Weeks',
        'Days': 'Days',
        'Hours': 'Hours',
        'Minutes': 'Minutes',
        'Seconds': 'Seconds',
        'MilliSeconds': 'Milliseconds'
      };
    }

    this._to = setInterval(() => this._displayString(), this.units['milliseconds'] ? 1 : 1000);

  }


  _displayString() {

    const now: any = new Date(),
      lastUnit = this.units[this.units.length - 1],
      unitsLeft = [],
      unitConstantMillis = {
        'weeks': 6048e5,
        'days': 864e5,
        'hours': 36e5,
        'minutes': 6e4,
        'seconds': 1e3,
        'milliseconds': 1
      };

    let msLeft: any = this.givenDate - now,
      returnString = '';

    if (msLeft <= 0) {
      this.endCount.emit();
      clearInterval(this._to);
    }

    this.units.forEach((unit: string) => {

      if (!unitConstantMillis[unit]) {
        // $interval.cancel(countDownInterval);
        throw new Error('Cannot repeat unit: ' + unit);
      }

      if (!unitConstantMillis.hasOwnProperty(unit)) {
        throw new Error('Unit: ' + unit + ' is not supported. Please use following units: weeks, days, hours, minutes, seconds, milliseconds');
      }

      unitsLeft[unit] = msLeft / unitConstantMillis[unit];

      unitsLeft[unit] = lastUnit === unit ? Math.ceil(unitsLeft[unit]) : Math.floor(unitsLeft[unit]);

      msLeft -= unitsLeft[unit] * unitConstantMillis[unit];

      unitConstantMillis[unit] = false;

      returnString += ' ' + unitsLeft[unit] + ' ' + unit;

    });

    this.displayString = returnString
      .replace('Weeks', this.text.Weeks)
      .replace('Days', this.text.Days)
      .replace('Hours', this.text.Hours)
      .replace('Minutes', this.text.Minutes)
      .replace('Seconds', this.text.Seconds)
      .replace('Milliseconds', this.text.MilliSeconds);
  }

}
