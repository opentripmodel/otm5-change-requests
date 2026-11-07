---
sidebar_label: Fleet Management Systems
---

# OTM Profile - Fleet Management Systems (FMS)

:::warning
This profile is still a work in progress.
:::

:::info
The message models of OTM profiles are specified and maintained here: https://sutc.semantic-treehouse.nl/specifications

Direct link to the DRAFT version [OTM Profile - TMS-FMS](https://sutc.semantic-treehouse.nl/message-model/MessageModel_74ddde7e-578a-4790-b674-15274637d902)
:::

## Overview

Within transport processes start with defining `consignments` that need to be delivered, which are eventually planned into `trips`. At some point the vehicle carrying the goods actually starts driving. Usually, some device (either the vehicle itself, or some separate device placed in the vehicle) will start emitting GPS updates of the current location at that point in time. To model this OTM5 contains the `LocationUpdateEvent` that contains this GPS update and the time of measuring. This is captured in the fleet management systems profile, also known as FMS profile.

Currently the scope of this profile only contains the GPS updates, but it will also incorporate other sensor data (such as temperature, road situations, traffic jams, etc.) later once we have a more solid grip on how to model it in OTM.

One available implementation of this profile is the [FMS ITS example](../examples/fms-its.md).

## Profile structure

There are a few rules to this profile:
* Since this event is happening in real-time, the required lifecycle is `actual`.
* The vehicle that emits the event is usually referenced to keep messages small (there are usually a lot of location updates). Note that it is possible to have location updates without a vehicle, for example whenever a phone with some tracking app is used. Currently OTM does not allow to attach a vehicle to another type of device yet. So, whenever this is the case, it is recommended to use the external attributes to refer to the device identifier emitting the event instead of a vehicle.
* The geoReference is mandatory and **always** required to be a `latLonPointGeoReference`.
* Optionally, actors are also allowed, to indicate whom the event belongs to. This is especially helpful with cross shipper/carrier operations.

### Protobuf

Since these type of messages can occur a lot and need to be processed as soon as possible we recognize the need to for something smaller than JSON messages, such as binary formats. Protobuf is one of the available formats and OTM5 supports the use of Protobuf instead of JSON for `LocationUpdateEvent`s. Protobuf was developed by Google and made available as open source.

Google's own [page](https://developers.google.com/protocol-buffers/) uses the following definition:

> “Protocol buffers are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data – think XML, but smaller, faster, and simpler. You define how you want your data to be structured once, then you can use special generated source code to easily write and read your structured data to and from a variety of data streams and using a variety of languages”.

As a next step we will create an official `LocationUpdateEvent` Protobuf schema and make it available here.

Profobuf is also used in the [FMS ITS example](../examples/fms-its.md).

## Example

The shape of messages in this profile is very simple, it contains the single event type `LocationUpdateEvent` with the GPS coordinates, and optional speed and heading information:

```json
{
  "creationDate": "2022-06-10T12:43:00.46Z",
  "lifecycle": "actual",
  "vehicle": {
    "uuid": "1ee62c47-5c2a-4681-b209-b1bfa15bc1bb",
    "entityType": "vehicle",
    "associationType": "reference"
  },
  "geoReference": {
    "lat": 51.95179,
    "lon": 4.57067,
    "speed": {
      "value": 82,
      "unit": "kmh"
    },
    "heading": {
      "value": 38,
      "unit": "degrees"
    },
    "type": "latLonPointGeoReference"
  }
}
```

## Validation

You can use the [Validator](../developers/validation) to validate your implementation according to the OTM profile specification.
