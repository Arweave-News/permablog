import { Component } from "react";
import Arweave from "arweave";
import { Alert, Button  } from "react-bootstrap";
import { interactWrite } from 'smartweave'

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 100000,
  logging: false,
});

const amaContractId = 'uBAtZUaLK8rolhSILgfxG_UGU2GcvawhdQjid3K5oE4'

class AmaQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questionAsked: false,
        questionFailed: false,
    };
  }

  createQuestion = async (amaId, questionText) => {
    const wallet = JSON.parse(sessionStorage.getItem("arweaveWallet"));
    const input = {'function': 'ask', 'id': amaId, 'question': questionText}
    const tags = { "Contract-Src": amaContractId, "App-Name": "SmartWeaveAction", "App-Version": "0.3.0", "Content-Type": "text/plain" }
    const txId = await interactWrite(arweave, wallet, amaContractId, input, tags)
    
    if (txId) {
      this.setState({ questionAsked: true, lastAnswerTx: txId })
      //setTimeout(() => { window.location = "#ama" })
    } else {
      this.setState({ questionFailed: true })
    }
  }

  onQuestionFormSubmit = (event) => {
    event.preventDefault();
    const amaId = event.target.amaId.value;
    const questionText = event.target.questionText.value;
    this.createQuestion(amaId, questionText);
  };

  render() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
      return (
        <div>
            <h2 className="mt-4 mb-4">Ask a question</h2>
            <div className="post-form">
                <form onSubmit={this.onQuestionFormSubmit}>
                    <div>
                        <input
                            placeholder="AMA ID (e.g. @arweaveNews_1615928471657_AMA)"
                            className="id-field mt-2"
                            type="text"
                            id="amaId"
                            name="amaId"
                            disabled={this.props.question.id}
                            defaultValue={this.props.question.id}
                            >
                        </input>
                    </div>
                    <div>
                        <textarea
                            placeholder="Your question..."
                            className="question-field"
                            type="text"
                            rows="5"
                            id="questionText"
                            name="questionText"
                        />
                    </div>         
                    <div>
                        {sessionStorage.getItem("arweaveWallet") ? 
                            <Button variant="outline-primary" className="mt-2 mb-5" type="submit">
                                Submit question
                            </Button>
                            :
                            <Button disabled variant="outline-primary" className="mt-2 mb-5" type="submit">
                                Connect wallet to submit
                            </Button>
                        }
                    </div>
                </form>
                {this.state.questionAsked ? (
            <Alert transition="fade" className="mt-4 show alert alert-success">
              Question submitted! {" "}<a href={`https://viewblock.io/arweave/tx/${this.state.lastAnswerTx}`}>Check on viewblock.io in a few minutes</a>
            </Alert>
          ) : null}
          {this.state.questionFailed ? (
            <Alert transition="fade" className="mt-4 show alert alert-danger">
              Question failed to submit{" "}
            </Alert>
          ) : null
          }
            </div>
        </div>
      )
  }
}

export default AmaQuestionForm
