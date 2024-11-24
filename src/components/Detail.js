import React, {useState} from "react";
import {Button, Container, Table, Modal} from "react-bootstrap";
import {useLocation, useNavigate} from 'react-router-dom';


export default function Detail(){
    const [Items, setItems] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const { state } = useLocation(); 
    const navigate = useNavigate();
    const id = state?.id;

    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const backToList = () => {
        navigate('/');
    }

     const handleDeleteItem = async () => {
        try {
        const response = await fetch(
            `https://67288011270bd0b97555c189.mockapi.io/items/${id}`,
            {
            method: "DELETE",
            }
        );

        if (response.ok) {
            handleCloseDeleteModal();
            navigate('/');
        } else {
            console.error(`Error: ${response.statusText}`);
        }
        } catch (error) {
        console.error("Delete error: ", error);
        }
    };

    const handleEdit = () => {
        navigate("/Update", { state: { ...state} });
    };

    const handleShowDeleteModal = (id) => {
        setCurrentId(id);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    return(
        <Container className="my-3">
            <h1 className="text-center mb-4">Supermarket Item Restocking</h1>

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
                        <th>Modify</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={id}>
                            <td>{state.Index + 1}</td>
                            <td>{state.Item.name}</td>
                            <td>{state.Item.category}</td>
                            <td>{state.Item.quantity}</td>
                            <td>{state.Item.price}</td>
                            <td>{state.Item.expiryDate}</td>
                            <td>
                                <Button variant="outline-secondary" size="sm" onClick={handleEdit}>
                                    Edit
                                </Button>
                            </td>
                            <td>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleShowDeleteModal(state.Item.id)}
                            >
                                Delete
                            </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <div className="d-grid gap-2">
                    <Button id="btnCourse" variant="secondary" size="lg" onClick={backToList}>
                        Back to the list
                    </Button>
                </div>
                
            </div>

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered size="sm">
                <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>Are you sure you want to delete this item?</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={backToList}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteItem}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}