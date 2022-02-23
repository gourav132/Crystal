import { useState, useEffect } from 'react';
import { database, timestamp } from '../Firebase/config';

const useUploadURL = (url) => {
    const [ requestStatus, setRequestStatus ] = useState(false);
    const collectionRef = database.collection('images');

    useEffect(() => {
        if(url){  // if there is an url then trying to upload the url otherwise not doing nothing
            const createdAt = timestamp();
            collectionRef.add({ url, createdAt })
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