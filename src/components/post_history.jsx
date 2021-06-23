import { Component } from "react";
import Arweave from "arweave";
import ArDB from "ardb";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 100000,
  logging: false,
});

const ardb = new ArDB(arweave);

class PostHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidUpdate() {
    
  }


  componentDidMount() {
    this.setState({ posts: [] });
    ardb
      .search("transactions")
      .appName('permablog-v1')
      .from(sessionStorage.getItem("wallet_address"))
      .limit(100)
      .find()
      .then((Txs) => {
        this.setState({ posts: Txs });
      });
  }

  getTitle = (post) => {
    let title = post.node.tags.find((obj) => obj.name === "Title");
    if (title) {
      return title.value;
    }
  };


  loadPosts = () => {
    let postIds = []
    let postUrls = []

    for (let post of this.state.posts) {
      postIds.push({ id: post.node.id, title: this.getTitle(post) });
    }
    
    for (let post of postIds) {
        postUrls.push(
          <p>
            <a
              target="_blank noreferrer noopener"
              href={`https://arweave.net/${post.id}`}
            >
              {post.title}
            </a>
          </p>
        )
    }
    return postUrls
  }

  render() {
    if (this.state.posts.length === 0 ) {
      return false;
    }
    if (!sessionStorage.getItem("arweaveWallet")) {
        return false;
    }

    return (
      <div className="post-history mt-4 ml-5">
        <h2 className="pb-3 border-bottom border-secondary">your permaposts</h2>
        <div className="pt-2">{this.loadPosts()}</div>
      </div>
    );
  }
}

export default PostHistory;
