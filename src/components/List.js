import React, {useState, useEffect, useRef} from "react";
import {Button, Container, Row, Table, Modal, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function List(){
    const [Items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        quantity: "",
        price: "",
        expiryDate: "",
    });

    const nameRef = useRef();
    const categoryRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const expiryDateRef = useRef();

    const [showAddModal, setShowAddModal] = useState(false);

    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);

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

    const handleAddItem = async () => {
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
            const response = await fetch("https://67288011270bd0b97555c189.mockapi.io/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                handleCloseAddModal();
                getItems();
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
        console.error("Post error: ", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getItems();
    }, []);

    return(
        <Container className="my-3">
            <h1 className="text-center mb-4">Supermarket Item Restocking</h1>
            <Row className="gx-3">
                <Button id="btnCourse" variant="secondary" className="col my-3 mx-2" onClick={getItems}>
                Show a list of items
                </Button>
                <Button id="btnAdd" variant="primary" className="col my-3 mx-2" onClick={handleShowAddModal}>
                Add new item
                </Button>
            </Row>

            <div className="table-responsive">
                <Table bordered hover striped className="text-center">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {Items.map((Item, index) => (
                    <tr key={Item.id}>
                        <td>{index + 1}</td>
                        <td><Link to={'/Detail'} state={{ id: Item.id, Item: Item, Index: index}}>{Item.name}</Link></td>
                        <td>{Item.category}</td>
                        <td>{Item.quantity}</td>
                        <td>{Item.price}</td>
                        <td>{Item.expiryDate}</td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </div>
            

            <Modal show={showAddModal} onHide={handleCloseAddModal} centered size="sm">
                <Modal.Header closeButton>
                <Modal.Title>Add New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Control name="name" type="text" className="mb-2" placeholder="Enter name" value={formData.name} onChange={handleChange} ref={nameRef}/>
                    <Form.Control name="category" type="text" className="mb-2" placeholder="Enter category" value={formData.category} onChange={handleChange} ref={categoryRef}/>
                    <Form.Control name="quantity" type="text" className="mb-2" placeholder="Enter quantity" value={formData.quantity} onChange={handleChange} ref={quantityRef}/>
                    <Form.Control name="price" type="text" className="mb-2" placeholder="Enter price" value={formData.price} onChange={handleChange} ref={priceRef}/>
                    <Form.Control name="expiryDate" type="date" className="mb-2" placeholder="Enter expiry date" value={formData.expiryDate} onChange={handleChange} ref={expiryDateRef}/>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddItem}>
                    Add
                </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );

}