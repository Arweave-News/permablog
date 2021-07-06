import { Component } from "react";
import Arweave from "arweave";
import { Button, Card} from "react-bootstrap";
import { readContract } from 'smartweave'
import AmaQuestionForm from "./ama_question_form";
import AmaAnswerForm from "./ama_answer_form"

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 100000,
  logging: false,
});

const amaContractId = 'nyKnauUtvmp93DAHqMJc2b4rycYkGw596IHlc2pO1Sw'

class Ama extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      showAnswerForm: false,
    };
  }

  componentDidMount() {
    this.loadAmas()
    this.getQuestions()
  }

  onAnswerClick = async (qId) => {
    const wallet = JSON.parse(sessionStorage.getItem("arweaveWallet"));
    if (!wallet) { return null } else {
      await arweave.wallets.jwkToAddress(wallet).then((address) => {
          sessionStorage.setItem("wallet_address", address);
      });
      const walletAddr = sessionStorage.getItem("wallet_address")
      if (walletAddr === this.props.ama.guestAddress) {
          this.setState({showAnswerForm: true, questionToAnswer: qId})
      } else {
          alert('You are not the guest of this AMA')
      }
    }
  }

  getQuestions = () => {
      let questionsList = []
      let questions = this.props.ama.questions
      if (questions.length === 0 ) { questionsList.push(<span>No questions yet!</span>) }
      for (let i in questions) {
        let q = questions[i]
        questionsList.push(
            <div>
                <span>{q.question}</span>
                <span className="small text-success">({q['QID']})</span>
                <span><Button onClick={() => this.onAnswerClick(q['QID'])} variant="link">Answer</Button></span>
            </div>
        )
      }
      return questionsList
  }

  loadAmas = async () => {
    const amasObj = await readContract(arweave, amaContractId)
    this.setState({amas: amasObj["ama"]})
  }

  showQuestionForm = (a) => {
    this.setState({questionToAsk: a})
    this.setState({showQuestionForm: true})
  }

  render() {
      console.log('ama props:')
      console.log(this.props)
    return (
      <div className="mb-5">
        {this.state.showQuestionForm ? <AmaQuestionForm question={this.state.questionToAsk}/> : null }
        {this.state.showAnswerForm ? <AmaAnswerForm ama={this.props.ama} question={this.state.questionToAnswer}/> : null }
        <Card border="dark" className="mx-auto mb-2">
          <Card.Header as="h5">Questions for {this.props.ama.guest} <span className="small">(AMA id: {this.props.ama.id})</span></Card.Header>
          <Card.Body>
            <Card.Body>{this.getQuestions()}</Card.Body>
            <Button onClick={() => this.showQuestionForm(this.props.ama)} variant="outline-primary">Ask a question</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Ama;
