import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { $, $$ } from './bling';

// This is just a sample starter indexer
// This fetches the value from the mainController and stockSchema to populate an H1 tag for this example
// It's here to ensure that any AJAX API calls are set to work in the MERN stack

function getIndexer() {
    class Indexer extends React.Component {
        constructor(props) {
            super(props);
            this.state = {array: []};
        }

        componentDidMount() {
            axios
                .get('/test')
                .then(res => {
                    const array = res.data;
                    array.forEach((element) => {
                        console.log(element);
                    })
                    this.setState({
                        array: res.data
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        }

        render() {
            return (
                <h1>{this.state.array}</h1>
            );
        }
    }

    ReactDOM.render(
        <Indexer />,
        $('#root')
    );
}

export default getIndexer;
