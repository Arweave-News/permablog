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

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  createPost = (postText, postTitle, postTags) => {
    const wallet = JSON.parse(sessionStorage.getItem("arweaveWallet"));
    this.setState({ postPublished: false });
    arweave.createTransaction({ data: postText }, wallet).then((tx) => {
      tx.addTag("Title", postTitle);
      tx.addTag("App-Name", "permablog-v1");
      tx.addTag("Content-Type", "text/html");
      tx.addTag("Post-Tags", postTags);
      // TODO - more here
      arweave.transactions.sign(tx, wallet).then(() => {
        arweave.transactions.post(tx, wallet).then((response) => {
          if (response.statusText === "OK") {
            this.setState({ postPublished: true });
          }
        });
      });
    });
  };

  //invokeContract = () => {}

  onFormSubmit = (event) => {
    event.preventDefault();
    const postText = event.target.postText.value;
    const postTitle = event.target.postTitle.value;
    const postTags = event.target.postTags.value;
    this.createPost(postText, postTitle, postTags);
  };

  render() {
    return (
      <div class="post-form">
        <form onSubmit={this.onFormSubmit}>
          <div>
            <input
              placeholder="post title"
              className="title-field mt-4"
              type="text"
              id="title"
              name="postTitle"
            ></input>
          </div>
          <div>
            <textarea
              placeholder="post html body"
              className="post-field"
              type="text"
              rows="10"
              id="post"
              name="postText"
            />
          </div>
          <div>
            <input
                placeholder="tag, tag2, tag3..."
                className="post-field mt-2"
                type="text"
                id="tags"
                name="postTags"
              ></input>
          </div>
          <div>
            {sessionStorage.getItem("arweaveWallet") ? 
            <Button kind="success" className="btn btn-primary mt-3" type="submit">
              Post to the permaweb
            </Button>
            :
            <Button disabled kind="success" className="btn btn-primary mt-3" type="submit">
              Connect wallet to post
            </Button>
    }
          </div>
        </form>
        {this.state.postPublished ? (
          <Alert transition="fade" className="mt-4 show alert alert-success">
            Post published{" "}
          </Alert>
        ) : null}
      </div>
    );
  }
}

export default PostForm;
