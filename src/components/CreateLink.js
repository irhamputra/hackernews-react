import React, {Component} from 'react';
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
import {FEED_QUERY} from "./LinkList";

const FEED_MUTATION = gql`
    mutation FeedMutation($description: String!, $url: String!) {
        createLink(description: $description, url: $url) {
            id
            url
            description
        }
    }
`;

export default class CreateLink extends Component {
    state = {
        description: '',
        url: ''
    };

    render() {
        const {description, url} = this.state;
        return (
            <div>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={description}
                        onChange={e => this.setState({description: e.target.value})}
                        type="text"
                        placeholder="A description for the link"
                    />
                    <input
                        className="mb2"
                        value={url}
                        onChange={e => this.setState({url: e.target.value})}
                        type="text"
                        placeholder="A URL for the link"
                    />
                </div>
                <Mutation mutation={FEED_MUTATION}
                          variables={{description, url}}
                          onCompleted={() => this.props.history.push('/')}
                          update={(store, { data: { post } }) => {
                              const data = store.readQuery({ query: FEED_QUERY });
                              data.feed.links.unshift(post);
                              store.writeQuery({
                                  query: FEED_QUERY,
                                  data
                              })
                          }}
                >
                    {feedMutation => <button onClick={feedMutation}>Submit</button>}
                </Mutation>
            </div>
        );
    }
};