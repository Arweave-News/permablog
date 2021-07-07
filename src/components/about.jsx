import React from 'react'
import { Button } from 'react-bootstrap'

export default function About() {
    return(
        <div>
            <div className="mt-4 p-2">
                <p className="p-6">🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 </p>
                <p>Permablog is a pre-alpha project from <a href="https://arweave.news" rel="noopener noreferrer" target="_blank">arweave.news</a>.
                It currently hosts the list of active arweave.news AMAs, giving the community a way to ask questions to AMA guests, and guests a way to answer - all powered by the blockweave and stored forever!</p>
                <div>
                    <Button className="mb-4" href="#ama" variant="primary">Go to AMAs</Button>
                </div>
                <hr/>
                <h5 className="mt-4 mb-4">What is ARN?</h5>
                <p>ARN is the arweave.news profit-sharing token (PST).</p>
                <p>For now you can earn ARN by having your questions answered in arweave.news AMAs. In the future, ARN's use cases will be expanded to permanent blogging and content management. 🔮</p>
            </div>
        </div>
    )
}