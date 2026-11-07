# Monitoring trips


## Overview

Trips model visiting multiple _locations_ with a _vehicle_ and doing multiple _actions_ on and in between those locations, such as loading and unloading consignments. A single trip goes through multiple phases,  each which has more information than the previous. It is possible that different parties are only involved in some of the phases, so it is not required to model each phase.

The different phases of a trip are:
1. Creating a (draft) planning of a trip. This planning contains the locations that need to be visited, but might or might not know at which times these locatons will be visited. All actions in this trip are in the lifecycle planned. Other information about the trip might be gradually added, such as the vehicle and the driver that are supposed to drive this trip. Note that this is not mandatory though, if information is present it can be provided right at the start.

2. Once a planning is finalized it can be driven. The vehicle and planned times are all known. At this point we might know more about the state of the world and can anticipate what will happen during the trip, such as being delayed because of a traffic jam. Continous location update and traffic events can provide real-time insight in where the vehicle is, that can serve as a basis to make predictions.

3. Once all is set and done the trip is finished. All information is known and cannot change anymore since it is in the past. This information is useful so we can compare our original planning with what actually happened so we can make more accurate planning data in the future. It can also be used for billing, or analyzing the data to find bottlebecks and optimize the process for next trips.


## General structure

Monitoring trips is a complex operation that includes almost every entity and action within OTM, and was actually the primary reason for creating OTM. Looking at the original image from [OTM entities](../fundamentals/entities) we can see that for the monitoring trips profile, only the TransportOrder is not present. The current diagram is shown in monochrome and combines the entities, events, and actions that can occur across the three phases, with actual _proof of delivery_ using a HandOver as the phase 3 addition.

![](/img/otm5_monitoring_trips_profile.png)

Since this might not give enough insight, we can also present the hierarchy with the required rules as follows:

- Trip
  - A trip _must_ have a unique UUID.
  - A trip _can_ contain a vehicle that is requested/planned/realized to drive the corresponding trip. Once the trip is in phase 2 the vehicle should be known.
  - A trip _can_ contain a list of involved actors, such as the carrier driving the trip of the shipper containing the goods to be transported. They are not mandatory, but recommended.
  - A trip _can_ contain constraints about the time windows between which the trip should be completed.
  - A trip _must_ contain a list of actions, including at least two _stops_, and optionally a _move_ between them. Since a trip has to visit at least two places to be considered a trip.
      - Stop
          - A stop _must_ contain a Location
          - A stop _can_ contain actions itself, usually _load_ and _unload_ actions 
          - The _load_ and _unload_ actions only require a reference to the consignments that are loaded/unloaded.
          - A stop _can_ also contain _genericActions_ in for actions that do not have a native OTM variant yet (such as taking a break, applying     maintenance, adding fuel, etc.).
          - A stop _can_ contain any other data that is present in the specification, such as a _sequenceNumber_, _startTime_, _endTime_, _remark_, etc.
          - A stop _can_ contain a time-based constraint.
      - Move (this is optional), can contain the route between two stops to exactly show how to go from one place to another.
      - And then again stop/move/stop, etc.


## Examples

### A (planned) trip

We start with a trip, give it a unique ID, and add the relevant parties involved (shipper, carrier):

```json
{
  "id": "976eed42-bccc-4731-9d01-85ec3a16bd7b",
  "status": "requested",
  "actors": [
    {
      "entity": {
        "id": "0d3198ad-2f2d-4aed-8c77-6d7779aefba3",
        "name": "Shipping Company TM"
      },
      "roles": [ "shipper" ],
      "associationType": "inline"
    },
    {
      "entity": {
        "id": "005cffff-4aba-4e2d-a79d-d428ba93ae8a",
        "name": "Carrier Transport"
      },
      "roles": [ "carrier" ],
      "associationType": "inline"
    }
  ],
  "actions": [ ]
}
```

Then we create the first stop on the departure location:

```json
    {
      "entity": {
        "id": "2664fb3c-9ce4-4a56-98d0-4ac76c2a40c4",
        "lifecycle": "planned",
        "sequenceNr": 0,
        "location": {
          "entity": {
            "id": "5a71bd67-e51c-46d1-842b-5fa171c0eb08",
            "name": "Location of distribution center Bananas Inc",
            "geoReference": {
              "lat": 1,
              "lon": 0,
              "type": "latLonPointGeoReference"
            }
          },
          "associationType": "inline"
        },
        "actions": [ ],
        "actionType": "stop"
      },
      "associationType": "inline"
    }
```

We can add a constraint, to indicate that this stop should be visited between the boundary time windows:
```json
"constraint": {
    "entity": {
    "value": {
        "startTime": "2021-03-25T10:00:00Z",
        "endTime": "2021-03-25T11:00:00Z",
        "type": "timeWindowConstraint"
    }
    },
    "associationType": "inline"
},
```

Then, on the stop, a load action is created, with the consignment to be loaded:

```json
          {
            "entity": {
              "id": "2a806c26-640c-4562-85d5-8ea4b9e7d80f",
              "lifecycle": "planned",
              "consignment": {
                "entity": {
                  "id": "04a9870f-52c0-463a-80c1-7d1d81c8b38a",
                  "goods": [
                    {
                      "entity": {
                        "id": "db504c69-3769-4d70-9403-c870dabdbe4c",
                        "description": "Ordered box of Bananas",
                        "quantity": 2,
                        "type": "items"
                      },
                      "associationType": "inline"
                    }
                  ]
                },
                "associationType": "inline"
              },
              "actionType": "load"
            },
            "associationType": "inline"
          }
```

The complete trip can be found [here](/data/trip_with_actions.json)

### A trip with vehicle, trailer and driver information

Continuing, once the trip contains planned actions we can attach a vehicle:
```json
  "vehicle": {
    "entity": {
      "id": "1ee44c03-f899-421f-8e89-8f568ca30424",
      "vehicleType": "truck",
      "fuel": "Diesel",
      "length": {
        "value": 9,
        "unit": "m"
      },
      "height": {
        "value": 4.2,
        "unit": "m"
      },
      "width": {
        "value": 2.5,
        "unit": "m"
      },
      "licensePlate": "AB-12-CD"
    },
    "associationType": "inline"
  },
```

Whenever we found a driver to drive the truck, we can add that to the actors of the _trip_ (not the vehicle):

```json
{
  "entity": {
    "id": "6084fd58-d26b-47e9-945b-5df9f2a36d70",
    "name": "Hank",
    "contactDetails": [
      {
        "value": "0031699999999",
        "type": "phone"
      }
    ]
  },
  "roles": [ "driver" ],
  "associationType": "inline"
}
```

Lastly, if we need a trailer on the truck we can attach it on a stop (usually the first). As an example here is the complete first stop with trailer attachment:

```json
{
      "entity": {
        "id": "2664fb3c-9ce4-4a56-98d0-4ac76c2a40c4",
        "lifecycle": "planned",
        "sequenceNr": 0,
        "location": {
          "entity": {
            "id": "5a71bd67-e51c-46d1-842b-5fa171c0eb08",
            "name": "Location of distribution center Bananas Inc",
            "geoReference": {
              "lat": 1,
              "lon": 0,
              "type": "latLonPointGeoReference"
            }
          },
          "associationType": "inline"
        },
        "actions": [
          {
            "entity": {
              "lifecycle": "planned",
              "transportEquipment": {
                "entity": {
                  "id": "25b01018-a5b4-4cee-a14f-6b72d8624b77",
                  "equipmentType": "trailer",
                  "licensePlate": "01-AAA-1"
                },
                "associationType": "inline"
              },
              "actionType": "attachTransportEquipment"
            },
            "associationType": "inline"
          },
          {
            "entity": {
              "id": "2a806c26-640c-4562-85d5-8ea4b9e7d80f",
              "lifecycle": "planned",
              "consignment": {
                "entity": {
                  "id": "04a9870f-52c0-463a-80c1-7d1d81c8b38a",
                  "goods": [
                    {
                      "entity": {
                        "id": "376a5f1f-0b68-4671-bab6-2bd2b63c9f7b",
                        "description": "Ordered box of Bananas",
                        "quantity": 2,
                        "type": "items"
                      },
                      "associationType": "inline"
                    }
                  ]
                },
                "associationType": "inline"
              },
              "actionType": "load"
            },
            "associationType": "inline"
          }
        ],
        "constraint": {
          "entity": {
            "value": {
              "startTime": "2021-03-25T10:00:00Z",
              "endTime": "2021-03-25T11:00:00Z",
              "type": "timeWindowConstraint"
            }
          },
          "associationType": "inline"
        },
        "actionType": "stop"
      },
      "associationType": "inline"
    },
```

You might wonder why the trailer is on the stop instead of on the vehicle itself. The reason is that in many logistic operations there might be more than one trailer involved. By using one system the simple case might be a little more involved, but it works without any changes for more complex operations.

The complete trip with vehicle information can be found [here](/data/trip_with_vehicle.json)

### A trip with realization data

So, once we have the complete planned trip above we can start driving and enrich the real-time GPS data to the vehicle by some FMS:

```json
{
  "id": "a9c8746e-d6ca-401b-8890-759188789092",
  "lifecycle": "actual",
  "vehicle": {
    "uuid": "1ee44c03-f899-421f-8e89-8f568ca30424",
    "entityType": "vehicle",
    "associationType": "reference"
  },
  "geoReference": {
    "lat": 2,
    "lon": 3,
    "type": "latLonPointGeoReference"
  }
}
```

Now the original trip can be enriched with the realized stop data by creating stops with the same UUID, but the lifecycle realized:

```json
    {
      "entity": {
        "id": "2664fb3c-9ce4-4a56-98d0-4ac76c2a40c4",
        "lifecycle": "realized",
        "sequenceNr": 0,
        "location": {
          "uuid": "5a71bd67-e51c-46d1-842b-5fa171c0eb08",
          "entityType": "location",
          "associationType": "reference"
        },
        "startTime": "2021-03-25T10:11:00Z",
        "endTime": "2021-03-25T10:34:00Z",
        "actions": [
          {
            "entity": {
              "id": "2a806c26-640c-4562-85d5-8ea4b9e7d80f",
              "lifecycle": "realized",
              "consignment": {
                "uuid": "04a9870f-52c0-463a-80c1-7d1d81c8b38a",
                "entityType": "consignment",
                "associationType": "reference"
              },
              "actionType": "load"
            },
            "associationType": "inline"
          }
        ],
        "constraint": {
          "entity": {
            "value": {
              "startTime": "2021-03-25T10:00:00Z",
              "endTime": "2021-03-25T11:00:00Z",
              "type": "timeWindowConstraint"
            }
          },
          "associationType": "inline"
        },
        "actionType": "stop"
      },
      "associationType": "inline"
    }
```

The complete trip with all realization data can be found [here](/data/trip_with_realization_data.json)


### A trip with consignor/consignees

The above trip depicts the situation where all the goods in the trip belong to a single party, the shipper. However in real 
logistic operations it often happens that a carrier transports goods of different parties in a single trip. You can
model this situation in OTM5 by using the designated actor roles _consignor_ and _consignee_ on each consignment:

```json
    "consignment": {
      "entity": {
        "id": "04a9870f-52c0-463a-80c1-7d1d81c8b38a",
        "goods": [
          {
            "entity": {
              "id": "eb2e8f2a-b573-4d66-9d99-ff9235e10415",
              "description": "Ordered box of Bananas",
              "quantity": 2,
              "type": "items"
            },
            "associationType": "inline"
          }
        ],
        "actors": [
          {
            "entity": {
              "id": "a1c3c25b-f766-45b6-b09d-07005d565353",
              "name": "Bananas Inc."
            },
            "roles": [ "consignor" ],
            "associationType": "inline"
          },
          {
            "entity": {
              "id": "02724538-1022-46cc-8286-186154fc0b9b",
              "name": "Fine Food groceries"
            },
            "roles": [ "consignee" ],
            "associationType": "inline"
          }
        ]
      },
      "associationType": "inline"
    },
```

The complete trip using consignor/consignee can be found [here](/data/trip_with_consignor_consignee.json).
