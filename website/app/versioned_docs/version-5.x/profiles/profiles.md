---
title: OTM Profiles
id: profiles
---

OTM profiles
============

### Introduction
As can be seen from the specification, there is no single top-level element in OTM. Depending on the use case your viewpoint might change and some other entity becomes top-level. For instance, for a 'home delivery' operation the trips are the central piece of the puzzle, with each visit multiple locations to deliver goods. However for a track-and-trace operation, the consignments and its contained goods are the central entity, which might be part of _multiple_ trips before arriving at its final destination.

This approach makes OTM flexible while remaining quite simple and small and the data is modelled the same way. That flexibility is useful, but on its own it is not enough for interoperable data exchange. Two parties could both use valid OTM data while implementing different messages, choose different optional fields, or make different assumptions about what information is mandatory.

To counter this, for several use cases OTM contains so-called _OTM profiles_. A profile is a stricter set of rules on top of the OTM core model to ensure that specific messages have a clear intent and are unambiguous. The rules in a profile show you the hierarchy of the entities, define which data is expected for that use case, and can make fields required even though they are optional in the generic OTM specification.

### Why profiles are important

Sometimes profiles are seen as a risk for uncontrolled growth of OTM implementations. In practice the opposite is true: profiles prevent fragmentation by making implementations more comparable.

Without profiles, every project or sector would have to decide for itself how to apply the flexible OTM core model for its own exchange purpose. That would lead to many slightly different interpretations of OTM, all technically valid, but difficult to align between parties. We've seen this hapening in pracice.

Profiles reduce that risk because they:

* keep everyone on the same OTM vocabulary and semantics;
* narrow down the allowed structure for a specific exchange purpose;
* identify which fields and relations are required, optional, or out of scope;
* make implementations easier to validate, compare, and discuss across organizations;
* create reusable agreements that can be adopted by more than one project or sector.

So a profile is not a separate variant of OTM. It is a shared implementation agreement for a clearly defined use case, built on the same OTM foundation. The more parties reuse the same profile for the same purpose, the better aligned their OTM implementations become.

### Setup
Each profile uses the same setup:

1. **Overview** It starts of with the what and the why of the profile in a few sentences. So you can quickly determine whether this profile is of interest to you.
2. **General Structure** Then it provides the general structure, which entities are involved, and what data in these entities are present.
3. **Example** Since this all fairly abstract, it then continues with an example. This example is first provided in text, and then worked out in detail in actual JSON messages.
4. **JSON message*** If applicable, links on how to validate JSON messages using the validation tool are present.