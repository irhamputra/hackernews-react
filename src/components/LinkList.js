import React, {Component} from 'react';
import Link from './Link';
import gql from "graphql-tag";
import {Query} from "react-apollo";

export const FEED_QUERY = gql`
    query {
        feed {
            count
            links {
                id
                description
                url
                votes {
                    id
                    user {
                        id
                    }
                }
                postedBy {
                    id
                    name
                }
            }
        }
    }
`;

export default class LinkList extends Component {
    _updateCacheAfterVote = (store, createVote, linkId) => {
        const data = store.readQuery({query: FEED_QUERY});
        const votedLink = data.feed.links.find(link => link.id === linkId);

        votedLink.votes = createVote.link.votes;

        store.writeQuery({query: FEED_QUERY, data});
    };

    render() {

        return (
            <Query query={FEED_QUERY}>
                {({loading, err, data}) => {
                    if (loading) return <div>Loading...</div>;
                    if (err) throw new Error('Error...');

                    const linksToRender = data.feed.links;
                    return (
                        <>
                            {linksToRender.map((link, index) => <Link
                                    key={link.id}
                                    link={link}
                                    index={index}
                                    updateStoreAfterVote={this._updateCacheAfterVote}
                                />
                            )}
                        </>
                    )
                }}
            </Query>
        );
    }
}