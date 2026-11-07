Adding Constraints
===================

Constraints are entities that model restrictions on how to perform certain actions. There are a few different kind of constraints, such as the delivery windows of consignments or visiting certain stops, or the type of vehicle that is supposed to drive a certain trip because of demands the goods have (i.e. temperature or size).

The reason Constraints are entities and not a data type is because elaborate constraints might need to reused over and over again. An environmental zone will need to be complied to at pre-determined times during the week, being able to reference existing constraints makes communicating about these restrictions easier.

Time fields vs time constraints
-------------------------------

Note that time constraints are different from the `startTime` and `endTime` present on actions. The `startTime` and `endTime` model that something will be/is/was happening within those time slots. For example, delivering a package between 10:00 and 10:15. However the `TimeWindowsConstraint` model that something _has_ to happen within (usually) a wider slot. For example, when you order a package, you often get to pick a 'shift' (e.g. between 09:00 - 13:00 or 13:00 - 17:00). The stops within the trip might change and your original time of between 10:00 and 10:15 can change, but the constraints remains the same.

An example of stop with both planned start and end times, as well as a constraint could look like this:

```json
{
  "actionType": "stop",
  "id": "d3ada5d6-8007-4742-8ff0-ad06919d39a4",
  "lifecycle": "planned",
  "startTime": "2020-11-06T10:30:00Z",
  "endTime": "2020-11-06T10:45:00Z",
  "constraint": {
    "entity": {
      "value": {
        "startTime": "2020-11-06T09:00:00Z",
        "endTime": "2020-11-06T12:00:00Z",
        "type": "timeWindowsConstraint"
      }
    },
    "associationType": "inline"
  }
}
```

You can interpret this that the stop is _planned_ to arrive at 10:30 and leaves again at 10:45. However, it _should_ arrive after 09:00 and leave again before 12:00 according to the constraint.

TimeWindowsConstraint vs StartDateTimeConstraint and EndDateTimeConstraint?
---------------------------------------------------------------------------

Since version 5.2 OTM supports two ways of providing time-related constraints. The new version, `timeWindowsConstraint` makes it easier to provide both a lower bound (arrive after) and upper bound (leave before). Before you had to use the `startDateTimeConstraint` and `endDateTimeConstraint` toghether with an `andConstraint` to model the same thing. Since the new version is shorter and more readable the old `startDateTimeConstraint` and `endDateTimeConstraint` are deprecated.