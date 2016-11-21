# angular2-simple-countdown
a simple countdown angular2 directive with multiple language


## Installation

### Npm

`npm install angular2-simple-countdown`


## Usage
```javascript
import {CountDown} from "../../node_modules/angular2-simple-countdown/countdown";

@NgModule({
  declarations: [
    CountDown
  ],
  ....
  
  })

<count-down units="Days | Hours | Minutes | Seconds | Milliseconds" end="February 22, 2016"></count-down>
<count-down units="Days | Hours " end="February 22, 2016"></count-down>
<count-down units="Days | Hours | Minutes | Seconds" end="February 22, 2016"></count-down>
```
## Field Schema

`count-down`: initializes directive

`end-date`: the end date. _takes any format js Date() allows_

`units`: which units you want the countdown to be viewed in

