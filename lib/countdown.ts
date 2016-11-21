import { Component, Input } from "@angular/core";

@Component({
    selector: 'count-down',
    template: `<h1>{{displayString}}</h1>
  <ng-content></ng-content>
  `
})


export class CountDown {
    @Input() units: any;
    @Input() end: any;
    @Input() displayString: string = '';
    @Input() text: any;

    constructor() {
        setInterval(() => this._displayString(), 1);
    }

    _displayString() {

        if (typeof this.units === 'string') {
            this.units = this.units.split('|');
        }

        var givenDate: any = new Date(this.end);
        var now: any = new Date();

        var dateDifference: any = givenDate - now;
        var lastUnit = this.units[this.units.length - 1],
            unitConstantForMillisecs = {
                weeks: (1000 * 60 * 60 * 24 * 7),
                days: (1000 * 60 * 60 * 24),
                hours: (1000 * 60 * 60),
                minutes: (1000 * 60),
                seconds: 1000,
                milliseconds: 1
            },
            unitsLeft = {},
            returnString = '',
            totalMillisecsLeft = dateDifference,
            i,
            unit: any;
        for (i in this.units) {
            if (this.units.hasOwnProperty(i)) {

                unit = this.units[i].trim();
                if (unitConstantForMillisecs[unit.toLowerCase()] === false) {
                    //$interval.cancel(countDownInterval);
                    throw new Error('Cannot repeat unit: ' + unit);

                }
                if (unitConstantForMillisecs.hasOwnProperty(unit.toLowerCase()) === false) {
                    throw new Error('Unit: ' + unit + ' is not supported. Please use following units: weeks, days, hours, minutes, seconds, milliseconds');
                }

                unitsLeft[unit] = totalMillisecsLeft / unitConstantForMillisecs[unit.toLowerCase()];

                if (lastUnit === unit) {
                    unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
                } else {
                    unitsLeft[unit] = Math.floor(unitsLeft[unit]);
                }
                totalMillisecsLeft -= unitsLeft[unit] * unitConstantForMillisecs[unit.toLowerCase()];
                unitConstantForMillisecs[unit.toLowerCase()] = false;


                returnString += ' ' + unitsLeft[unit] + ' ' + unit;
            }
        }

        if (this.text === null) {
            this.text = {
                "Weeks": "Weeks",
                "Days": "Days", "Hours": "Hours",
                Minutes: "Minutes", "Seconds": "Seconds",
                "MilliSeconds": "Milliseconds"
            };
        }


        this.displayString = returnString
            .replace("Weeks", this.text.Weeks)
            .replace('Days', this.text.Days)
            .replace('Hours', this.text.Hours)
            .replace('Minutes', this.text.Minutes)
            .replace('Seconds', this.text.Seconds)
            .replace("Milliseconds", this.text.MilliSeconds);
    }
}
