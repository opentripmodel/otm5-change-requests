FMS-ITS 
======================

:::caution
FMS ITS is an implementation of the FMS profile. It uses OTM5 for communication between
companies. At the moment it contains more data than is available in OTM5. We are
working together to smooth things out and see where the OTM5 standard needs
additions and where the implementation needs updates. So note that not
everything within the FMS ITS is OTM5.
:::


Overview
--------

This is an implementation of the [FMS profile](../profiles/fms.md)

With ITS services, truck drivers can get in-truck real-time information about
dangerous situations, speed limits, lane closures, events, closed bridges,
emergency vehicles approaching, tyre pressure measurements, information of smart
traffic lights and many other types of real-time traffic information. ITS
services are the collective name for the available smart applications that can
be used in-truck.

The use of these kinds of data leads to benefits for logistics companies,
governments and society with regard to traffic flow, livability,
sustainability and the environment. 

A standardized interface between logistics parties and ITS cloud service
providers has been realized. This so-called ITS-FMS interface makes it possible
to make ITS services part of the solutions of a logistics IT-supplier (typically
Fleet Management System suppliers). The ITS-FMS interface has been established
as an OTM profile, for which this page provides an introduction to start using
ITS services.

General Structure
-----------------

![](/img/general_structure_its.png)

The communication between ITS cloud service provider and logistical IT supplier
(typically Fleet Management System-supplier of the in-truck solution) runs
through two different syntax solutions (Open Trip Model and Protocol buffers)
and two different connections (REST API and WebSocket):
* RESTful API for the following OTM messages:
  * Vehicle
  * Trip
  * Route
* WebSocket connection with Protobuf messages for the following messages:
  * ITS Event message
  * LocationUpdateMessage (OTM look-a-like)

When implementing this ITS-FMS, effectively you’ll be setting up endpoints for
both types of connections.

![](/img/its_connections.png)

For the FMS-systems, there are various implementation options: 
1. CSP Backend – Backoffice (FMS backend implementation)
2. CSP Backend – Direct to vehicle (direct client implementation)

It is up to the logistics IT supplier to decide whether the communication takes
place directly from the client or via a backend. Both options have already been
tested in practice and each offer their own set of advantages and disadvantages.
Technical description of the ITS-FMS interface and Protobuf elaboration can be
found at:
https://dutchmobilityinnovations.com/spaces/1185/deflog/files?directoryID=9637

Example
------
