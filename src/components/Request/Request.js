import React, { useState } from "react";
import { Modal, Form, Button, Card, Col, Row } from "react-bootstrap";
import no_request from "./no_request.png";
import "./Request.css";

function Request({ preorder, onRequestSubmitEdit, onDeleteRequest }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    note: "",
  });

  const handleEditClick = (data) => {
    setFormData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      number: "",
      note: "",
    });
  };

  const handleSaveChanges = () => {
    onRequestSubmitEdit({
      name: formData.name,
      number: formData.number,
      note: formData.note,
    });
    setShowModal(false);
  };

  const handleDeleteClick = (name) => {
    onDeleteRequest(name);
  };

  return (
    <div className="container mb-5 text-center ">
      <h1 className="display-4 fw-bold">My Pre-order</h1>
      <p className="lead">Explore and manage your pre-orders</p>
      {preorder != "" ? (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {preorder?.map((data, index) => (
              <Col key={index}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                      <strong>จำนวน:</strong> {data.number}
                      <br />
                      <strong>หมายเหตุ:</strong> {data.note}
                    </Card.Text>
                    <Button
                      className="me-2"
                      variant="dark"
                      onClick={() => handleEditClick(data)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(data.name)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <img src={no_request} alt="no_request" className="small-image" />
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pre-order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formNumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product number"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product note"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Request;
