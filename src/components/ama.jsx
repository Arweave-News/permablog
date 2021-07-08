import { Component } from "react";
import Arweave from "arweave";
import { Button, Card} from "react-bootstrap";
import { readContract } from 'smartweave'
import AmaQuestionForm from "./ama_question_form";
import AmaAnswerForm from "./ama_answer_form"
import swal from 'sweetalert'

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 100000,
  logging: false,
});

const amaContractId = 'UjZ6sg7KvoF1XoW7ReB2X3P5uHAbCWYaUIzB7XrjTtM'

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
    if (!wallet) { swal({title: "Connect Your Wallet to Answer", text: "Are you the guest of this AMA? Login with Arweave to answer.", icon: "error"}) } else {
      await arweave.wallets.jwkToAddress(wallet).then((address) => {
          sessionStorage.setItem("wallet_address", address);
      });
      const walletAddr = sessionStorage.getItem("wallet_address")
      if (walletAddr === this.props.ama.guestAddress) {
          this.setState({showAnswerForm: true, questionToAnswer: qId})
      } else {
          swal({title: "Wrong Guest Address", text: "You are not the guest of this AMA", icon: "error"})
      }
    }
  }

  getQuestions = () => {
      let questionsList = []
      let questions = this.props.ama.questions
      let answers = this.props.ama.answers
      if (questions.length === 0 ) { questionsList.push(<span>No questions yet!</span>) }
      for (let i in questions) {
        let q = questions[i]
        q.answers = []
          for (let j in answers) { 
            console.log(answers[j])
            if (answers[j].answerTo === q['QID']) { q.answers.push(answers[j].answer) }
          }
          console.log(q.answers)
        questionsList.push(
            <div>
              <Card border="dark" className="m-1 mb-4">
                <span className="mt-4 m-2" ><span><strong>{q.question} </strong></span><code className="ama-id">({q['QID']})</code></span>
                <hr/>
                <span className="answer-text unalign">{q.answers[0]}</span>
                <span><Button className="mb-4" onClick={() => this.onAnswerClick(q['QID'])} variant="link">Answer</Button></span>
              </Card>
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
          <Card.Header as="h5">Questions for {this.props.ama.guest}</Card.Header>
          <Card.Body>
            <Card.Body>{this.getQuestions()}</Card.Body>
            <Button onClick={() => this.showQuestionForm(this.props.ama)} variant="outline-primary">Ask a question</Button>
            <footer className="ama-id mt-4"><code className="mt-2">AMA id: {this.props.ama.id}</code></footer>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Ama;
