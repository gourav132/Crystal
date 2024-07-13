import { useState, useEffect } from 'react';
import { auth, database, timestamp } from '../Firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

const useUploadURL = (url) => {
    const [ requestStatus, setRequestStatus ] = useState(false);
    const [ user ] = useAuthState(auth);
    const collectionRef = database.collection('images');

    useEffect(() => {
        if(url){  // if there is an url then trying to upload the url otherwise not doing nothing
            const createdAt = timestamp();
            collectionRef.add({ url, createdAt, user: user.displayName })
            .then( resp => {
                console.log(resp);
            })
            .catch( error => {
                console.log(error);
            })
        }
    }, [url])
    return { requestStatus }
}

export default useUploadURL;