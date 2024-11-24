import React, {useState, useRef} from "react";
import {Button, Modal, Form} from "react-bootstrap";
import {useLocation, useNavigate} from 'react-router-dom';

export default function Update(){
    const [Items, setItems] = useState([]);
    const { state } = useLocation(); 
    const navigate = useNavigate();

    const id = state?.id;

    const nameRef = useRef();
    const categoryRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const expiryDateRef = useRef();

    const [formData, setFormData] = useState({
        name: state.Item.name,
        category: state.Item.category,
        quantity: state.Item.quantity,
        price: state.Item.price,
        expiryDate: state.Item.expiryDate ? state.Item.expiryDate.split('T')[0] : "",
    });

    const getItems = async () => {
        try {
        const response = await fetch("https://67288011270bd0b97555c189.mockapi.io/items");
        if (response.ok) {
            const data = await response.json();
            setItems(data);
        } else {
            console.error(`Error: ${response.statusText}`);
        }
        } catch (error) {
        console.error("Fetch error: ", error);
        }
    };

    const handleUpdate = async () => {
        if (!formData.name) {
            alert("Name is required");
            nameRef.current.focus();
            return;
        }
        if (!formData.category) {
            alert("Category is required");
            categoryRef.current.focus();
            return;
        }
        if (!formData.quantity) {
            alert("Quantity is required");
            quantityRef.current.focus();
            return;
        }
        if (!formData.price) {
            alert("Price is required");
            priceRef.current.focus();
            return;
        }
        if (!formData.expiryDate) {
            alert("Expiry Date is required");
            expiryDateRef.current.focus();
            return;
        }

        try {
            const updatedData = { ...formData, expiryDate: formData.expiryDate.split('T')[0] };
            console.log("Updated Data:", updatedData);

            const response = await fetch(`https://67288011270bd0b97555c189.mockapi.io/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/'); 
                getItems();
            } else {
                console.error('Update failed');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClose = () => {
        navigate('/');
    };

    return(
        <Modal centered size="sm" show>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Control name="name" type="text" className="mb-2"  value={formData.name || ''} onChange={handleChange} ref={nameRef}/>
                <Form.Control name="category" type="text" className="mb-2"  value={formData.category || ''} onChange={handleChange} ref={categoryRef}/>
                <Form.Control name="quantity" type="text" className="mb-2"  value={formData.quantity || ''} onChange={handleChange} ref={quantityRef}/>
                <Form.Control name="price" type="text" className="mb-2"  value={formData.price || ''} onChange={handleChange} ref={priceRef}/>
                <Form.Control name="expiryDate" type="date" className="mb-2"  value={formData.expiryDate || ''} onChange={handleChange} ref={expiryDateRef}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                Update
                </Button>
            </Modal.Footer>
        </Modal>
    );

}
