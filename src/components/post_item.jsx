import { React, Component } from 'react';
import { Button } from 'react-bootstrap';
 
class PostItem extends Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }

    render() {
        return(
        <>
        <div className="d-flex">
            <div className="flex-fill">
                <Button
                    className="d-flex"
                    variant="link"
                    target="_blank noreferrer noopener"
                    href={`https://arweave.net/${this.props.id}`}
                    >
                    {this.props.title}
                </Button>
            </div>
            <div className="justify-content-end">
                <Button className="m-1 p-1" variant="secondary">Edit</Button>
                <Button className="m-1 p-1" variant="danger">Delete</Button>
            </div>
        </div>
        <hr/>
        </>
        )
    }
}

export default PostItem