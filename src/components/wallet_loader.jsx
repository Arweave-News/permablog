import React, { useState } from "react";
import {
  Container,
  Button,
  Modal,
} from "react-bootstrap";

import Arweave from "arweave";
const arweave = Arweave.init();

export default function WalletLoader() {

  const [show, setShow] = useState(false);
  let fileReader;

  const handleClickOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDisconnect = () => {
      sessionStorage.clear()
      window.location.reload(false)
  }

  const handleFileRead = (e) => {
    const content = fileReader.result;
    try {
      var wallet_file = JSON.parse(content);
      arweave.wallets.jwkToAddress(wallet_file).then((address) => {
        sessionStorage.setItem("wallet_address", address);
      });
      sessionStorage.setItem("arweaveWallet", content);
    } catch (err) {
      alert("Invalid wallet file", alert);
    }
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
    setShow(false)
    window.location.reload(false)
  };

  return (
      <Container>
          { sessionStorage.getItem("arweaveWallet") ?
        <Button variant="danger" onClick={handleDisconnect}>
          Disconnect wallet
        </Button>
    :
        <Button variant="success" onClick={handleClickOpen}>
          Login with Arweave
        </Button>
        }
      <Modal
        show={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Modal.Title className="p-4" id="alert-dialog-title">
          {"Login with Arweave"}
          <br></br>
        </Modal.Title>
        <Modal.Body className="m-2">
            Connect your Arweave wallet to use this app. Visit {" "}
            <a href="https://arweave.org">Arweave</a> to create a
            wallet.
        <br/><br/>
          <input
            className=""   
            id="raised-button-file"
            onChange={(e) => handleFileChosen(e.target.files[0])}
            type="file"
          />
        </Modal.Body>
        <Modal.Footer className="m-2">
        <Button variant="danger" onClick={handleClose} color="danger">
            Cancel
          </Button>
        <Button
              variant="success"
              color="default"
              component="span"
            >
              Upload
            </Button>
          
        </Modal.Footer>
      </Modal>
      </Container>
  );
}