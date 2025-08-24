import { useState, useEffect } from 'react';
import { storage, database, timestamp, auth } from '../Firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

const useStorage = (file) => {
    const [ progress, setProgress ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ url, setUrl ] = useState(null);
    const [ user ] = useAuthState(auth);

    useEffect(() => {
        if (!file) return;
        
        // Handle both old and new file structure
        const actualFile = file.file || file;
        const imageName = file.name || actualFile.name;
        const imageDescription = file.description || '';
        
        // reference
        const reference = storage.ref(actualFile.name);
        const collectionRef = database.collection('images');
        reference.put(actualFile).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes)*100
            setProgress(percentage)
        }, (err) => {
            setError(err)
        }, async () => {
            const url = await reference.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ 
                url, 
                name: imageName || 'Untitled Image',
                description: imageDescription,
                createdAt, 
                user: user.displayName 
            })
            setUrl(url)
        })
    }, [file])

    return { progress, error, url }
}

export default useStorage;