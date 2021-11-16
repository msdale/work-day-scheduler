# work-day-scheduler
A Time Management (daily planner) Application

## Website
https://msdale.github.io/work-day-scheduler/

## URL image
![Work-Day-Scheduler](./assets/images/work-day-scheduler.png)

## Testing instructions

Go to the application tab in devtools.  Add in a new storage key/value where...
  Key is testHour (get the camel casing right)
       and...
  Value is <some integer from 0 - 23...represents hours of the day>

Setting testHour will allow you to test the background color (past=grey, present=red, future=green).
NOTE: A value less than 9 will show up on the Work Day Scheduler as all green events (future)
      And a value more than 17 will show up on the Work Day Scheduler as all grey events (past)