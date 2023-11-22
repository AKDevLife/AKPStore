import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import PreorderCover from "./pre_order.png";
import "./FormProduct.css";

const MySwal = withReactContent(Swal);

const FormProduct = ({ onRequestSubmit, preorder }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [note, setNote] = useState("");
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRequest(preorder);
  }, [preorder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const detail = { name, number, note };
      setRequest((prevRequest) => [...prevRequest, detail]);
      setName("");
      setNumber("");
      setNote("");

      setLoading(false);

      MySwal.fire({
        icon: "success",
        title: "Pre-order products!",
        text: "Your request has been submitted successfully.",
      });

      setRequest((updatedState) => {
        onRequestSubmit(updatedState);
        return updatedState;
      });
    }, 2000);
  };

  return (
    <div className="container container_form mb-5">
      <div className="text-center">
        <img
          src={PreorderCover}
          alt="PreorderCover"
          className="pre-oreder-image"
        />
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="formNumber">
          <Form.Label>Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product number"
            name="number"
            min="0"
            max="10"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="formNote">
          <Form.Label>Note</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product note"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Group>

        <Button
          className="btn_submit_form mt-4 mb-4 w-100"
          type="submit"
          disabled={loading}
          variant="dark"
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Loading...
            </>
          ) : (
            "Submit a request"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default FormProduct;
