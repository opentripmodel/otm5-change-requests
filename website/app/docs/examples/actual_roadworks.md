Actual Roadworks
================

Overview
--------

Roadworks are essential and important works that are carried out on roads, highways, and other public areas to improve the safety and condition of the roads.
Roadworks can include anything from a simple patch-up job, to major reconstructions and resurfacing. Roadworks are necessary to ensure that roads and highways are safe for drivers and pedestrians and can improve the efficiency of traffic flow 
and reduce the amount of time spent in traffic jams. Roadworks can involve a range of activities, from installing new road signs and traffic lights, to completely rebuilding roads. In addition to improving road safety, roadworks can also 
have a positive effect on the environment, by reducing emissions and noise pollution.

Planned roadworks are repairs and improvements to the road that have been planned in advance by the relevant authorities.  Planned roadworks may become actual at a certain moment.   Actual roadworks concerns all currently reported registration
and deregistration times of work on or near the road. It concerns the activities that affect the flow of traffic. This also includes phasing as well as applicable traffic measures, like remaining road capacity and maximum speed during the roadworks.


General structure
-----------------

Actual roadworks are described as OTM Event entities on a OTM Route.
An OTM Route entity is typically composed of the following elements:
- Route name
- Creation date and time of the actual roadwork
- Last modified date and the of the roadwork
- Geographical representation of the roadwork
- Constraints of the roadworks, e.g. applicable traffic measures

The OTM Event entity adds lifecycle information to the OTM Route, e.g.:
- `requested` 
- `planned`
- `projected`
- `actual`
- `realized`


### Typical constraints for roadworks

Actual roadworks described in OTM, typically start with an `andConstraint` having `timeWindowContraint` accompanied with constraints describing the applicable traffic messures.  Typical roadwork constraints are:
- `vehicleTypeConstraint` which describes the vehicle types that this constraint applies to
- `valueBoundConstraint` which describes limitations regarding e.g. speed, weight or height
- `accessConstraint` which describes limitations regarding e.g. speed, weight or height


Example
-------

Lets imagine we want to report actual road works that are registered on December 20, 2022 at 19:30 CET and deregistered on December 21, 2022 at 5:00 CET.  Two out-of-three lanes are closed and the maximum speed is 50 km/h. 
The template starts out with an `event` that holds an `route` entity:

```json
{
  "id": "58885aa4-fda3-488b-8930-f5867edac095",
  "name": "Actual roadworks A2",
  "creationDate": "2022-12-20T19:30:00",
  "lastModified": "2022-12-20T19:30:00",
  "lifecycle": "actual",
  "entity": {
    "entityType": "route",
    "id": "bc3459c9-288b-467d-8490-57319fc76d97",
    "name": "A2 between Breukelen and Maarsen: 2 out of 3 lanes are closed. Maximum speed is 50 km/h.",
    "geoReferences": ... ,
    "constraint": {
       "associationType": "inline",
       "entity": {
         "value": 
         {
            "type": "and",
            "and": [ {
                "type": "timeWindowConstraint",
                "startTime": "2022-12-20T19:30:00",
                "endTime": "2022-12-21T05:00:00"
                },
                {
                "type": "valueBoundConstraint",
                "valueType": "speed",
                "constaint": "maximum",
                "maximum": {
                    "value": 50,
                    "unit": "km/h"
                    }
                },
                {
                "type": "accessConstraint",
                "access": "partialClosed"
                } ]
         },
         ...
       }
    }
  }
}
```

