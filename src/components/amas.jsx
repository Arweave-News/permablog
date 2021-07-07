import { Component } from "react";
import Arweave from "arweave";
import { Button, Card } from "react-bootstrap";
import { interactRead, readContract } from 'smartweave'
import AmaQuestionForm from "./ama_question_form";
import ReactTooltip from "react-tooltip"
import Ama from "./ama.jsx"

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 100000,
  logging: false,
});

const amaContractId = 'UjZ6sg7KvoF1XoW7ReB2X3P5uHAbCWYaUIzB7XrjTtM'

// UjZ6sg7KvoF1XoW7ReB2X3P5uHAbCWYaUIzB7XrjTtM

class Amas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    //window.location.reload()
    this.loadAmas()
   // this.loadContract()
  }

  /*
  loadContract = async (amaId) => {
    const wallet = JSON.parse(sessionStorage.getItem("arweaveWallet"));
    const input = {"function" : "status", "id": amaId}
    const contract = interactRead(arweave, wallet, amaContractId, input)
    .then((contract => contract))
    return contract
  }
  */

  loadAmas = async () => {
    const amasObj = await readContract(arweave, amaContractId)
    this.setState({amas: amasObj["ama"]})
  }

  showQuestionForm = (a) => {
    this.setState({questionToAnswer: a})
    this.setState({showQuestionForm: true})
  }

  showAma = (a) => {
    this.setState({amaToShow: a})
    this.setState({showAma: true})
  }

  goBack = () => {
    console.log("CLICKED BACK")
    window.location.reload()
  }

/*
  getStatus = async (aId) => {
    return await this.loadContract(aId)
  }
*/

  renderAmas = () => {
    const amaList = []
    const amas = this.state.amas
    for (let i in amas) { 
      let a = amas[i]
      console.log(a)
      amaList.push(
        <Card border="dark" className="m-4 mx-auto mb-2">
          <div className="">
            <Card.Header>
              <Button size="lg" onClick={() => this.showAma(a)} variant="link">{a.guest}</Button>
              <span className="small" data-html="true" data-tip="ARN (Arweave News Token) is rewarded to users<br/>whose questions are answered by AMA guests,<br/>and to guests for answering questions.">[{a.reward} $ARN]</span>
              <ReactTooltip globalEventOff="hover"/>
            </Card.Header>
          </div>
          <Card.Body>
            <p>{a.description}</p>
            <Button className="mb-3" onClick={() => this.showQuestionForm(a)} variant="outline-primary">Ask a question</Button>
            <footer className="ama-id"><code className="mt-2">AMA id: {a.id}</code></footer>
          </Card.Body>
      </Card>
      )
    }
    return amaList
  }

  render() {
    const amas = this.renderAmas()
    return (
      <div>
      <div className="mt-4">
       <h2><Button variant="link" className="text-decoration-none" onClick={() => this.goBack()}>[ Back ]</Button>  AMAs</h2>
       <div className="mb-4">
        {this.state.showAma ? <Ama ama={this.state.amaToShow}/> : null}
        {!this.state.showQuestionForm && !this.state.showAma ? amas : null }
        {this.state.showQuestionForm ? <AmaQuestionForm question={this.state.questionToAnswer}/> : null }
        </div>
      </div>
      </div>
    );
  }
}

export default Amas;
