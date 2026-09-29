# Roomz

A student-first room discovery and booking UI for the Polytechnic College community in Arvi.

## Run locally

```bash
npm install
npm run dev
```

## Firebase setup

Firebase credentials are already configured in `src/firebase.js`. In Firebase Console, enable **Authentication → Sign-in method → Email/Password** and **Google**, then create **Cloud Firestore**. Add your deployed domain under Authentication → Settings → Authorized domains.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Firestore database design

You do not need to create fields by hand: the app creates the documents. Use these top-level collections:

- `users/{uid}`: `name`, `email`, `phone`, `address`, `role` (`owner` or `student`), `updatedAt`.
- `rooms/{roomId}`: `ownerId`, `ownerName`, `title`, `monthlyRent`, `city`, `area`, `address`, `contact`, `roomType`, `genderPreference`, `availability`, `drinkingWater`, `hotWater`, `attachedBathroom`, `messAvailable`, `parking`, `electricityIncluded`, `images` (array of compressed Base64 image strings), `createdAt`, `updatedAt`.

Photos are compressed in the browser and stored directly in the room Firestore document. Firestore has a 1 MiB document limit, so Roomz restricts compressed images to 160 KB each (four images maximum).

For initial development, Firestore test mode is convenient. Before release, apply rules so anyone may read rooms but only their owner may write them:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId} {
      allow read: if true;
      allow create: if request.auth != null && request.resource.data.ownerId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.ownerId == request.auth.uid;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```


The interface includes responsive discovery, room availability labels, amenity comparisons, student and owner account flows, Google sign-in entry points, filters, and saved-room interactions.
