import { Component } from "react";
import Arweave from "arweave";
import { Button, Card} from "react-bootstrap";
import { interactRead, readContract } from 'smartweave'
import AmaQuestionForm from "./ama_question_form";
import Ama from "./ama.jsx"

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 100000,
  logging: false,
});

const amaContractId = 'nyKnauUtvmp93DAHqMJc2b4rycYkGw596IHlc2pO1Sw'

class Amas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.loadAmas()
    this.loadContract()
  }

  loadContract = async (amaId) => {
    const wallet = JSON.parse(sessionStorage.getItem("arweaveWallet"));
    const input = {"function" : "status", "id": amaId}
    const contract = interactRead(arweave, wallet, amaContractId, input)
    .then((contract => contract))
    return contract
  }

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

  getStatus = async (aId) => {
    return await this.loadContract(aId)
  }

  renderAmas = () => {
    const amaList = []
    const amas = this.state.amas
    for (let i in amas) { 
      let a = amas[i]
      let status = this.getStatus(a.id)
      console.log(status)
      amaList.push(
        <Card border="dark" className="mx-auto mb-2" style={{'width': '60rem'}}>
          <Card.Header as="h5"><Button size="lg" onClick={() => this.showAma(a)} variant="link">{a.guest}</Button> | </Card.Header>
          <Card.Body>
            <Card.Title className="small">AMA id: <span className="">{a.id}</span></Card.Title>
            <Button onClick={() => this.showQuestionForm(a)} variant="primary">Ask a question</Button>
          </Card.Body>
      </Card>
      )
    }
    return amaList
  }

  render() {
    const amas = this.renderAmas()
    return (
      <div className="mt-4">
        <h2 className="m-4" >AMAs</h2> 
        {this.state.showAma ? <Ama ama={this.state.amaToShow}/> : null}
        {!this.state.showQuestionForm && !this.state.showAma ? amas : null }
        {this.state.showQuestionForm ? <AmaQuestionForm question={this.state.questionToAnswer}/> : null }
      </div>
    );
  }
}

export default Amas;
