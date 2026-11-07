Design Principles 
============


1. **Designed for communication, not processing or as an internal format.**

OTM is designed as a _communication format_. The intended purpose it that
different parties use the same language for communicating. To meet that purpose
OTM needs to be applicable in many use cases which requires great flexibility.
This flexiblity can complicate the code if you process OTM internally (for
example when dealing with inline vs reference associations). You are not
required - or even encouraged - to completely implement the specification if
doesn't fit your use cases. Focus on the parts of OTM that you need and
translate between OTM and your internal format at the boundaries of your
services.

2. **OTM is deliberately a loose format.**

As mentioned, OTM tries to serve a broad spectrum of use cases in the domain of
traffic and logistics, as such OTM is pretty loose in what data is required.
Many fields are optional, and often data types offer multiple modelling options,
such as the many georeference options available on a location. However, for your
use case some fields might actually be required, even if the OTM specification
makes them optional. In such cases the recommend approach is to _only_ accept
incoming OTM that you are able to process, and return validation errors
otherwise. There is no reason to accept OTM, even if valid, when you are not
able to process it anyway.

3. **The ultimate goal is to greatly reduce the amount of tailor-made software.**

The loose format with many optional values allows for handling many use cases
with one data model. However, it might result in two parties implementing OTM
without being able to communicate automatically. To avoid this, [OTM profiles
were created](../profiles), so that different use cases have a
clear intended structure. Even so, it could still result in small discrepancies.
We are continously trying to balance flexibility to enable parties to use OTM
broadly, and strict rules so that the parties use OTM consistently.

Instead, we could have decided to make OTM more strict, but that would limit the
real world use cases we can accurately model, without OTM becoming too bloated.
We strongly believe we should strive to avoid custom software as much as
possible, but that the limited amount of custom software needed to model
specific use cases or OTM profiles is already a large improvement over the many
custom, proprietary API formats that were needed before.