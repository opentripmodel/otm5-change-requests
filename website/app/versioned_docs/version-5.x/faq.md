---
title: FAQ
sidebar_position: 7
---

Frequently Asked Questions
==========================


* _How open or free is OTM5 as a standard? How do you prevent that different parties add or change fields?_
  
  > We cannot police every party that _says_ they are doing OTM without actually confirming to the well-defined standard. Simply put, if
  they do not follow the structures defined in [the API portal](/api) then they are not doing OTM. That said,
  even within the standard there still is some room for different interpretations, so we try to improve this situation by extending or
  documentation & examples, and continously improve the standard itself as well.

* _OTM5 contains some free text fields, such as the vehicle type, the unit measurement, and the type of transport equipment? Which values
  should be used for those fields?_

  > We have been working on incorporating 'standard lists' in the specification as well. For currencies, temperatures, mass, length and
  speed values we have provided the options in [the API specification](/api) and we are also currently working
  on extending that for the different 'types' that are present (such as vehicles, goods items, transport equipment, etc.)


* _When using Transport Orders is it mandatory to use one, or multiple consignments?_

  > A transport without any consignment doesn't make sense. However there is no rule about whether or not a transport order can contain one or
  multiple consignments. Different parties have different needs, so we cannot mandate a process here.

* _My company does not use UUIDs for identifying entities, are UUIDs mandatory?_

  > Since OTM5.2 you do not have to provide UUIDs anymore when sending entities. However, UUIDs are currently the best possible method of
  ensuring unique IDs among different platforms. So we highly recommend using them as your primary identifiers. Omitting UUIDs is thus
  allowed when sending entities, however you cannot retrieve entities by any other identifier. This might be accepted if retrieving is
  not necessary.

* _What are constraints used for?_
  
  > Constraints are, as the name suggests, are information about restrictions that hold for the actions or entities they are attached to.
  This can range from delivery windows for consignments, to vehicle types for certain type of goods. See also [the usage notes](./usage_notes/adding_constraints) for more information. 

* _What are the association types that appear in the OTM5 messages?_

  > Whenever you look at a hierarchy of entities. Such as a trip, containing stops, containing locations and various sub-actions such as loading and unloading
  consignments you can see that each entity is wrapped in what is called an _association_. These assocaitions are useful because sometimes we want to provide
  the information completely (association type inline), and sometimes we just want to refer to an existing entity (association type reference). This allows you
  to choose whatever is suited for your operation. See also [this dedicated page](./fundamentals/associations) about
  associations.

* _How can you deal with layered data about the load carriers and the goods contained in them?_

  > OTM5 contains the entity 'Goods' for which two types exist:
  > 1. Items: these are non-layered goods items such as bananas, paperclips, and other type of item you can think of.
  > 2. TransportEquipment: these are layered goods that contain other goods. Examples include boxes, pallets, but also trailers and containers. Basically
  > everything that contains other goods and is not _actively driving_ can be considered a transport equipment.
  >
  > You can thus combine both to create a trailer containing pallets with boxes of bananas and paperclips to model a layered hierarchy of goods.

* _The documentation shows that some entities can refer both ways. For example an action can refer to a consigment, but a consignment can
  also refer to actions. Why is this and how should it be used?_

  > OTM5 indeed allows entities to refer to each other in different ways. This is because OTM supports multiple use cases. For example whenever
  we model a trip that visits multiple locations we have trips that contain stops that again contain load and unload actions that refer to consignments
  being loaded and unloaded. Thus an action needs to be able to refer to the consignment. However, when we look at those same consignments from
  a _track and trace_ perspective we often follow a _single_ consignment that can be part of multiple trips before arriving at its final destination. Thus
  a consignment contains _all_ load and unload actions in that use case. It can be a bit daunting at first, but we strongly believe that this allows us to
  keep the specification fairly small while being useful for a wide range of use cases. See also the [overview](./fundamentals/fundamentals) for more information.
