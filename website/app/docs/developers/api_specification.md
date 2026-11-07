---
title: API Specification
sidebar_position: 7
---

The Open Trip Model (OTM) is supported by a comprehensive OpenAPI Specification (OAS) that outlines the structure and requirements for implementing OTM in your applications. The OAS provides developers with detailed guidelines on how to interact with OTM services, ensuring consistent communication and data exchange across logistics systems.

See the [API](/api) page for the most recent and previous versions of the OTM API specification.

---
More information
------

#### JSON File Format Requirement
The Open Trip Model (OTM) mandates the use of JSON as the file format for OTM5. This requirement simplifies data exchange and ensures compatibility among different parties implementing the model, as OTM5 does not support XML or other formats.

#### Communication Protocol
Communication within the OTM framework is based on the REST architecture, which is also mandatory. This decision aims to minimize variations in how OTM is communicated, promoting consistency across implementations. While REST is the primary protocol, we encourage developers to first focus on understanding the model before integrating the REST architecture into their applications.

#### Endpoints for Communication
It is important to note that the OTM standard does not provide predefined endpoints. Instead, parties must establish their own services for communication. The specifics of which party provides the endpoint and which one consumes it are left to the implementing parties to decide.

#### Updating Transport Orders
When it comes to updating transport orders with multiple consignments, there are two supported options. Parties can either send the complete transport order, including all consignments—both changed and unchanged—or they can send update requests for specific consignments that need modification. The first method consolidates the request but may result in larger message sizes, while the second allows for more efficient updates by sending only the changed information, albeit requiring multiple requests.

#### Actions vs. Events
In understanding the OTM model, it's essential to differentiate between actions and events. Actions represent dynamic interactions between static entities, such as loading and unloading goods from vehicles, while events capture updates to existing data or real-time changes, such as location updates or sensor readings.