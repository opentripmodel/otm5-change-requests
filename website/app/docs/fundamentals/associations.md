Associations
============

Introduction
------------

Often systems do not communicate with each other in isolation. For example, there are a lot of logistics operations that
move goods from distribution centers to smaller stores, where the goods can be sold individually. In this situation it
would not make sense to send the store and DC locations over and over again, since it does not change anyway.

In a similar fashion when transporting some goods between locations it does not make sense to completely repeat the
goods information again both at loading and unloading since they are the very same goods.

Because this type of situation is very common, OTM5 introduces the idea _associations_, where you can either provide
the data inline, or as a reference to some existing piece of that is defined elsewhere. This is similar to the idea
of relational databases, where the data is also referenced, and can be retrieved again using queries.

Type of assocations
-------------------

There are three different types of associations:

- _Inline_, by creating an entity within another entity directly.
- _By reference_ through referencing an existing entity by ID.
- _By attribute restriction_ through a set of restrictions on external attributes.

Most relations are optional, so it is also possible there is no association at all.

The following situations are all correct and mean the same thing:

1. A referenced location, where location with id `11c11d75-e114-4b5f-9751-b3a4afa23ecf` is already known:

```js
// A stop that is visiting a location by referencing it
{
  "actionType": "stop",
  "id": "acf8b1c9-f5fa-4f55-9f98-fc1e93cbd8b2",
  "location": {
    "associationType": "reference",
    "uuid": "11c11d75-e114-4b5f-9751-b3a4afa23ecf"
  },
  ... // Many more fields
}
```

2. An inline location, where location with ID `11c11d75-e114-4b5f-9751-b3a4afa23ecf` was not known and provided
as a whole:

```js
// A stop that is visiting a location by creating it inline
{
  "id": "acf8b1c9-f5fa-4f55-9f98-fc1e93cbd8b2",
  "location": {
    "associationType": "inline",
    "entity": {
        "id": "11c11d75-e114-4b5f-9751-b3a4afa23ecf",
        "type": "warehouse",
        "geoReference": {
          "type": "latLongPointGeoReference",
          "lat": 52.0838333,
          "lon": 5.8318803
        },
        ... // Many more fields
    }
  },
  ...
}
```

3. If the OTM entity id is unknown but we know enough of the attribute values to select the entity we want, it is possible to use an attribute restriction:

```js
{
  "id": "https://simacan.com/v5/stops/acf8b1c9-f5fa-4f55-9f98-fc1e93cbd8b2",
  "location": {
    "associationType": "attributeRestriction",
    "restriction": {
      "externalAttributes" : {
        "customerKey": "1234"
      }
    }
  },
  ... // Many more fields
}
```

4. If no location is known and the association is thus `unassociated`, you can also remove the reference all together:

```js
// A stop that is visiting a location that is still unknown
{
  "id": "acf8b1c9-f5fa-4f55-9f98-fc1e93cbd8b2",
  // location is still unknown, so it is not mentioned yet.
}
```

