import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrder } from '../slices';

const NewOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // ou avec la dépendance uuid
        // const id = `CMD-${uuidv4()}`;
        const id = `CMD-${Date.now()}`;
        dispatch(addOrder(id))

        // l'option replace true permet de remplacer dans l'historique de navigation l'url /new par /order/:oid au lieu de l'ajouter
        navigate(`/order/${id}`, { replace: true });
    }, [])
    
    return (
        <div>NewOrder</div>
    )
}

export default NewOrder