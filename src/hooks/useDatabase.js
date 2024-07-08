// import { useState, useEffect } from "react";
// import { database } from '../Firebase/config'

// const useDatabase = (collection) => {
//     const [ docs, setDocs ] = useState([]);
//     useEffect(() => {
//         const unsub = database.collection(collection)
//         .orderBy('createdAt', 'desc')
//         .onSnapshot((snapshot) => {  // onSnapshot fiers every time the database changes
//             let documents = []
//             snapshot.forEach(doc => {
//                 documents.push({...doc.data(), id: doc.id}) // equivalet to = documents.push({url: doc.url, doc.createdAt: createdAt, id: doc.id})
//             });
//             setDocs(documents)
//         })
//         return () => unsub();

//     }, [collection])

//     return { docs }

// }

// export default useDatabase;

import { useState, useEffect } from "react";
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";

const useDatabase = (collectionName) => {
    const [docs, setDocs] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            let documents = [];
            snapshot.forEach(doc => {
                documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
        });

        return () => unsub();
    }, [collectionName, db]);

    return { docs };
}

export default useDatabase;
