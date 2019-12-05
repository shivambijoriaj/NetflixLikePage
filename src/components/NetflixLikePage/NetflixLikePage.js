import React from 'react';
import GenericDisplayComponent from './GenericDisplayComponent';
import ListOfTitles from './ListOfTitles';
import './styles/netflixlikepage.css';

class NetflixLikePage extends React.Component {
    //The raw json data is stored in a state, in real environment an ajax call to get the
    //data will be made and then stored in the state.
    state = {
        netflixLikeData: {
            'mylist': [{
                    'title': 'Futurama',
                    'id': 1,
                    'img': 'http://cdn1.nflximg.net/webp/7621/3787621.webp'
                },
                {
                    'title': 'The Interview',
                    'id': 2,
                    'img': 'http://cdn1.nflximg.net/webp/1381/11971381.webp'
                },
                {
                    'title': 'Gilmore Girls',
                    'id': 3,
                    'img': 'http://cdn1.nflximg.net/webp/7451/11317451.webp'
                }
            ],
            'recommendations': [{
                    'title': 'Family Guy',
                    'id': 4,
                    'img': 'http://cdn5.nflximg.net/webp/5815/2515815.webp'
                },
                {
                    'title': 'The Croods',
                    'id': 5,
                    'img': 'http://cdn3.nflximg.net/webp/2353/3862353.webp'
                },
                {
                    'title': 'Friends',
                    'id': 6,
                    'img': 'http://cdn0.nflximg.net/webp/3200/9163200.webp'
                }
            ]
        },
        listOfTitles: []
    };

    componentDidMount = () => {
        this.updateListOfTitles();
    }

    //method which adds a title into Mylist and remove it from recommendation list
    //could also use hash data structure for O(1) adding and removing titles,current an bject array
    //is used and looping over it is in O(N) operational complexity for adding and removing titles.
    addTitle = (id) => {
        this.setState(prevState => {
            const newNetflixLikeData = prevState.netflixLikeData;
            for (let index = 0; index <= newNetflixLikeData.recommendations.length - 1; index++) {
                if (newNetflixLikeData.recommendations[index].id === id) {
                    newNetflixLikeData.mylist.push(newNetflixLikeData.recommendations[index]);
                    newNetflixLikeData.recommendations.splice(index, 1);
                    break;
                }
            }
            return {
                netflixLikeData: newNetflixLikeData
            };
        }, () => this.updateListOfTitles());
    };

    //method which removes a title from Mylist
    removeTitle = (id) => {
        this.setState(prevState => {
            const newNetflixLikeData = prevState.netflixLikeData;
            for (let index = 0; index <= newNetflixLikeData.mylist.length - 1; index++) {
                if (newNetflixLikeData.mylist[index].id === id) {
                    newNetflixLikeData.mylist.splice(index, 1);
                    break;
                }
            }
            return {
                netflixLikeData: newNetflixLikeData
            };
        }, () => this.updateListOfTitles());
    };

    //method to constantly have an updated list of titles present in mylist(to be displayed 
    //at the bottom of the page) after add,remove title operations.
    updateListOfTitles = () => {
        this.setState(prevState => {
            const newListOfTitles = [];
            for (let index = 0; index <= prevState.netflixLikeData.mylist.length - 1; index++) {
                newListOfTitles.push(prevState.netflixLikeData.mylist[index].title)
            }
            return {
                listOfTitles: newListOfTitles
            };
        });
    }

    render() {
        console.log(this.state.listOfTitles);
        //created common component for Mylist and Recommendation Components as they have UI and functionalty
        // in common for code reuse and redundancy.
        return (
            <>
                <GenericDisplayComponent rowDescription="My Lists" displayData={this.state.netflixLikeData.mylist} onClickFunction={this.removeTitle}/>
                <GenericDisplayComponent rowDescription="My Recommendations" displayData={this.state.netflixLikeData.recommendations} onClickFunction={this.addTitle}/>   
                <ListOfTitles listOfTitles={this.state.listOfTitles}/>
            </>
        );
    }
}

export default NetflixLikePage;
