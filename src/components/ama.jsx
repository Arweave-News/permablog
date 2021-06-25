import { Component } from "react";
import Arweave from "arweave";
import { Alert, Button } from "react-bootstrap";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 100000,
  logging: false,
});

const amaContractId = '92Tq6BKm6pvVkKW8_6Fb13QWTdUzBRLnG9scMBNWYZ4'

class AmaAnswerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  createAnswer = (amaId, qId, answerText) => {
    const wallet = JSON.parse(sessionStorage.getItem("arweaveWallet"));
    this.setState({ questionAnswered: false });
    arweave.createTransaction({ data: amaId }, wallet).then((tx) => {
      tx.addTag("Contract-Src", amaContractId);
      tx.addTag("App-Name", "SmartWeaveAction");
      tx.addTag("App-Version", "0.3.0")
      tx.addTag("Content-Type", "text/html");
      tx.addTag("input", `{ "function": "answer", "id": ${amaId}, "answer": ${answerText}, "qid": ${qId} }`)
      arweave.transactions.sign(tx, wallet).then(() => {
        arweave.transactions.post(tx, wallet).then((response) => {
          if (response.statusText === "OK") {
            this.setState({ questionAnswered: true });
          }
        });
      });
    });
  };

  //invokeContract = () => {}

  onAnswerFormSubmit = (event) => {
    event.preventDefault();
    const amaId = event.target.amaId.value;
    const qId = event.target.qId.value;
    const answerText = event.target.answerText.value;
    this.createAnswer(amaId, qId, answerText);
  };

  render() {
    return (
      <div><h2 className="mt-4 mb-2">Answer a question</h2>
      <div class="post-form">
        <form onSubmit={this.onAnswerFormSubmit}>
          <div>
            <input
              placeholder="AMA ID (e.g. @arweaveNews_1615928471657_AMA)"
              className="id-field mt-2"
              type="text"
              id="amaId"
              name="amaId"
            ></input>
            <input
              placeholder="Question ID (e.g. F6wH7q9bMXp9TqB_RbxI3GyerREXO1_twFnlYYAojDA)"
              className="id-field pl-2 mt-2"
              type="text"
              id="qId"
              name="qId"
            ></input>
          </div>
          <div>
            <textarea
              placeholder="Answer to question..."
              className="question-field"
              type="text"
              rows="5"
              id="answerText"
              name="answerText"
            />
          </div>
          
          <div>
            {sessionStorage.getItem("arweaveWallet") ? 
            <Button kind="success" className="btn btn-primary mt-3" type="submit">
              Submit answer
            </Button>
            :
            <Button disabled kind="success" className="btn btn-primary mt-3" type="submit">
              Connect wallet to submit
            </Button>
    }
          </div>
        </form>
        {this.state.questionAnswered ? (
          <Alert transition="fade" className="mt-4 show alert alert-success">
            Answer submitted{" "}
          </Alert>
        ) : null}
      </div>
      </div>
    );
  }
}

export default AmaAnswerForm;
