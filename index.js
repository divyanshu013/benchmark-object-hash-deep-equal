const isEqual = require("lodash.isequal");
const fastDeepEqual = require("fast-deep-equal");
const objectHash = require("object-hash");
const { performance } = require("perf_hooks");

const fullJson = require("./full.json"); // fetched contacts from contacts directory
const fullKeyedJson = require("./full-keyed.json"); // stored contacts as id key and contact value
const hashedJson = require("./hash-keyed.json"); // stored contacts as id key and hashed value

const fakeApiCall = data => console.log("API", data);

const testDeepEqual = () => {
  const start = performance.now();

  const uploadedContacts = fullKeyedJson;
  const contacts = fullJson;

  const contactIds = contacts.map(contact => contact.id);

  const added = contacts.filter(contact => !uploadedContacts[contact.id]);

  const uploadedContactsValues = Object.values(uploadedContacts);
  const deleted = uploadedContactsValues.filter(
    uploadedContact => !contactIds.includes(uploadedContact.id)
  );
  const updated = contacts.filter(contact => {
    const uploadedContact = uploadedContacts[contact.id];
    if (uploadedContact) {
      // a non matching contact should be updated
      return !isEqual(contact, uploadedContact);
    }
    return false;
  });

  // upload contacts
  fakeApiCall({
    added,
    deleted,
    updated
  });

  // to be saved
  const nextUploadedContacts = contacts.reduce(
    (all, contact) => ({
      ...all,
      [contact.id]: contact
    }),
    {}
  );

  const end = performance.now();

  console.log("lodash isEqual took: ", end - start);
};

const testFastDeepEqual = () => {
  const start = performance.now();

  const uploadedContacts = fullKeyedJson;
  const contacts = fullJson;

  const contactIds = contacts.map(contact => contact.id);

  const added = contacts.filter(contact => !uploadedContacts[contact.id]);

  const uploadedContactsValues = Object.values(uploadedContacts);
  const deleted = uploadedContactsValues.filter(
    uploadedContact => !contactIds.includes(uploadedContact.id)
  );
  const updated = contacts.filter(contact => {
    const uploadedContact = uploadedContacts[contact.id];
    if (uploadedContact) {
      // a non matching contact should be updated
      return !fastDeepEqual(contact, uploadedContact);
    }
    return false;
  });

  // upload contacts
  fakeApiCall({
    added,
    deleted,
    updated
  });

  // to be saved
  const nextUploadedContacts = contacts.reduce(
    (all, contact) => ({
      ...all,
      [contact.id]: contact
    }),
    {}
  );

  const end = performance.now();

  console.log("fast-deep-equal took: ", end - start);
};

const testObjectHash = () => {
  const start = performance.now();

  const uploadedContacts = hashedJson;

  const contacts = fullJson;

  const contactIds = contacts.map(contact => contact.id);

  const added = contacts.filter(contact => !uploadedContacts[contact.id]);

  // only ids in case of deleted for hash approach
  const deleted = Object.keys(uploadedContacts).filter(
    uploadedContactKey => !contactIds.includes(uploadedContactKey)
  );
  const updated = contacts.filter(contact => {
    const uploadedContactHash = uploadedContacts[contact.id];
    if (uploadedContactHash) {
      // a non matching contact should be updated
      return objectHash(contact) !== uploadedContactHash;
    }
    return false;
  });

  // upload contacts
  fakeApiCall({
    added,
    deleted,
    updated
  });

  const nextUploadedContacts = contacts.reduce(
    (all, contact) => ({
      ...all,
      [contact.id]: objectHash(contact)
    }),
    {}
  );

  const end = performance.now();

  console.log("object hash took: ", end - start);
};

// run tests
testDeepEqual();
testFastDeepEqual();
testObjectHash();
