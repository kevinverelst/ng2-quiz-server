import * as firebase from "firebase-admin";

export class FirebaseService {
   static getFirebaseRef(collectionName: string): firebase.database.Reference {
        let db = firebase.database();
        return db.ref(collectionName);
    }
}