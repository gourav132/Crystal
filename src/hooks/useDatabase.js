import { useState, useEffect } from "react";
import { getFirestore, collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

const useDatabase = (collectionName, uid, collectionId = null) => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const db = getFirestore();

    useEffect(() => {
        setLoading(true);
        setError(null);

        try {
            let q;
            
            if (collectionName === 'images') {
                if (collectionId) {
                    // Get images for a specific collection
                    q = query(
                        collection(db, collectionName), 
                        where("collectionId", "==", collectionId),
                        orderBy('createdAt', 'desc')
                    );
                } else {
                    // Get all images for the user (not in any collection)
                    q = query(
                        collection(db, collectionName), 
                        where("user", "==", uid),
                        where("collectionId", "==", null),
                        orderBy('createdAt', 'desc')
                    );
                }
            } else {
                // For other collections (like 'collections')
                q = query(
                    collection(db, collectionName), 
                    where("userId", "==", uid),
                    orderBy('createdAt', 'desc')
                );
            }

            const unsub = onSnapshot(q, (snapshot) => {
                let documents = [];
                snapshot.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id});
                });
                setDocs(documents);
                setLoading(false);
            }, (error) => {
                console.error('Error fetching documents:', error);
                setError(error.message);
                setLoading(false);
            });

            return () => unsub();
        } catch (error) {
            console.error('Error setting up query:', error);
            setError(error.message);
            setLoading(false);
        }
    }, [collectionName, db, uid, collectionId]);

    return { docs, loading, error };
}

export default useDatabase;
