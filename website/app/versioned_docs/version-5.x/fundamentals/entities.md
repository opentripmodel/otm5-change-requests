OTM Entities
============

### Connecting all entities

Chronologically, it all starts with the **TransportOrder** (Transport Order), which groups a set of **Consignments** (Consignment) that need to be shipped from one location to another. A consignment contains various related **Goods** (Goods) that are shipped together and administered together. Thus note that goods are actual physical entities, whereas transport orders and consignments are administrative ones. The official **Documents** (Document) that are related to the goods, transport orders, consignments or the delivery thereof can also be attached either as binary or with a reference to some online location.

Ultimately, consignments are moved as part of one or multiple **Trips** (Trip), where various **Constraints** (Constraint) can be put in place to ensure consignments are delivered on time, or always abide to a certain temperature during the trip. The transport orders and consignments can be associated with various **Actors** (Actor). Such as the shipper, the carrier, the consignee, consignor, or any legal party that is involved in the logistic operation.

The trip is an entity that models visiting various **Locations** (Location) using a single **Vehicle** (Vehicle). As such, when multiple vehicles are involved, these need to be modelled as multiple trips in OTM. Each location that is visited at a certain time is a **Stop action** (Action) on which multiple other actions can occur, such as **Loading** (Action) and **Unloading** (Action) of various Consignments. Other actions include **Waiting** (Action) - for example because the dock is still occupied - and having a **Break** (Action). The big difference is that a break is always mandatory and waiting can be shortened if the situation changes.

Consignments after unloading can be (optionally) **HandOver** (Action) from one party (an actor) to another. If needed, you can use a **Move** (Action) action to model a detailed description of how to travel between two locations and which **Route** (Route) to take.

During a trip a **Sensor** (Sensor) in a vehicle can give **LocationUpdateEvents** (Event) with coordinates of the vehicle, or **SensorUpdateEvents** (Event) with sensor values, for example the temperature of the goods, or the speed of the vehicle. After OTM data has been shared, it can be updated using **UpdateEvents** (Event) with the modified data of the entities that needed to be updates. Also entities can be _associated_ and _unassociated_ using the **AssociationCreatedEvent** (Event) and **AssociationRemovedEvent** (Event). This can be useful to provide or modify information of which vehicle is going to drive which trip after an initial planning has been made.
### Visually

The above can be visualized as follows:

![](/img/otm5_overview_1.png)

We can also use color-coding to differentiate actions and entities (blue vs
black), and gray out arrows to and from actors and constraints. Since basically
every entity can have some relationship to them to get the following:

![](/img/otm5_overview_2.png)

This can be overwhelming, since there are so many arrows. You can even see some
arrows point two ways. The OTM is thus not a
[tree](https://en.wikipedia.org/wiki/Tree_(data_structure)) but a
[graph](https://www.tutorialspoint.com/data_structures_algorithms/graph_data_structure.htm).
The reason for this setup - as we will show later on - is because it is easier
to model different use cases that way.