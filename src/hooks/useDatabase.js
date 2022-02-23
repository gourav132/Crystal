import { useState, useEffect } from "react";
import { database } from '../Firebase/config'

const useDatabase = (collection) => {
    const [ docs, setDocs ] = useState([]);
    useEffect(() => {
        const unsub = database.collection(collection)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {  // onSnapshot fiers every time the database changes
            let documents = []
            snapshot.forEach(doc => {
                documents.push({...doc.data(), id: doc.id}) // equivalet to = documents.push({url: doc.url, doc.createdAt: createdAt, id: doc.id})
            });
            setDocs(documents)
        })
        return () => unsub();

    }, [collection])

    return { docs }

}

export default useDatabase;