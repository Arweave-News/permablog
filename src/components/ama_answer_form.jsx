import { Component } from "react";
import Arweave from "arweave";
import { Alert, Button } from "react-bootstrap";
import { interactWrite } from 'smartweave'

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 100000,
  logging: false,
});

const amaContractId = 'UjZ6sg7KvoF1XoW7ReB2X3P5uHAbCWYaUIzB7XrjTtM'

class AmaAnswerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionAnswered: false,
      answerFailed: false,
    };
  }

  createAnswer = async (amaId, qId, answerText) => {
    const wallet = JSON.parse(sessionStorage.getItem("arweaveWallet"));
    const input = {'function': 'answer', 'id': amaId, 'answer': answerText, 'qid': qId}
    const tags = { "Contract-Src": amaContractId, "App-Name": "SmartWeaveAction", "App-Version": "0.3.0", "Content-Type": "text/plain" }
    const txId = await interactWrite(arweave, wallet, amaContractId, input, tags)
    
    if (txId) {
        this.setState({ questionAnswered: true, lastAnswerTx: txId }) 
    } else {
      this.setState({ answerFailed: true})
    }
  }

  onAnswerFormSubmit = (event) => {
    event.preventDefault();
    const amaId = event.target.amaId.value;
    const qId = event.target.qId.value;
    const answerText = event.target.answerText.value;
    this.createAnswer(amaId, qId, answerText);
  };

  render() {
    console.log(this.props)
      return (
        <div >
        <h2 className="mt-4 mb-2">Answer a question</h2>
        <div className="post-form mb-4">
          <form onSubmit={this.onAnswerFormSubmit}>
            <div>
              <input
                placeholder="AMA ID (e.g. @arweaveNews_1615928471657_AMA)"
                className="id-field mt-2"
                type="text"
                id="amaId"
                name="amaId"
                defaultValue={this.props.ama.id}
              ></input>
              <input
                placeholder="Question ID (e.g. F6wH7q9bMXp9TqB_RbxI3GyerREXO1_twFnlYYAojDA)"
                className="id-field pl-2 mt-2"
                type="text"
                id="qId"
                name="qId"
                defaultValue={this.props.question}
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
            
            <div className="mb-5">
              {sessionStorage.getItem("arweaveWallet") ? 
              <Button variant="outline-primary" className="mt-3 mb-3" type="submit">
                Submit answer
              </Button>
              :
              <Button disabled variant="outline-primary" className="mt-3 mb-3" type="submit">
                Connect wallet to submit
              </Button>
      }
            </div>
          </form>
          {this.state.questionAnswered ? (
            <Alert transition="fade" className="mt-4 show alert alert-success">
              Answer submitted! {" "}<a href={`https://viewblock.io/arweave/tx/${this.state.lastAnswerTx}}`}>Check on viewblock.io in a few minutes</a>
            </Alert>
          ) : null}
          {this.state.answerFailed ? (
            <Alert transition="fade" className="mt-4 show alert alert-danger">
              Answer failed to submit{" "}
            </Alert>
          ) : null
          }
        </div>
      </div>
      )
  }
}

export default AmaAnswerForm