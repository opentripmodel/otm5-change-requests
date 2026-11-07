External attributes
===================

`ExternalAttributes` are a data type that can be used to communicate data between parties that can not be modelled with OTM. In essence, external attributes can be used as _free fields_ to add that type of data. This allows you to extend the data present in OTM without the need to change the specification. This usually will be administrative, or company-specific data. Note though, that if something _can_ be modeled using just OTM entities it _should_ be done that way. External attributes are often used to provide IDs that are not UUIDs but still need to be communicated.

External attributes are nothing more than a list of key-values. This is an example of what it could look like:

```js
{
  "customerId": "1234",
  "shift": "Morning shift"
}
```