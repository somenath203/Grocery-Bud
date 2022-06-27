import { useEffect } from 'react'

const Alert = ({ type, msg, dispALertForTwoSeconds, list }) => {

    useEffect(() => {

        const timeout = setTimeout(() => {

            dispALertForTwoSeconds();

        }, 2000);

        return () => clearTimeout(timeout);

    }, [list]);

    return (
        <>
            <p className={`alert alert-${type}`}>{msg}</p>
        </>
    );
}

export default Alert;