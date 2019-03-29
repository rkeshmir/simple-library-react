// IMPORT PACKAGE REFERENCES
import React from 'react';
import {Link} from 'react-router-dom';
import {fetchShelves, addShelf, removeShelf} from '../../services/BookService';

// COMPONENT

export default class BooksPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shelves: []
        };
        this.removeShelf = this.removeShelf.bind(this);
    }

    componentDidMount() {
        fetchShelves().then(shelves=>this.setState({shelves}));
    }

    componentDidUpdate() {
        console.log('componentDidUpdate', this.state.shelves);
    }

    addShelf() {
        const shelf = this.newShelf;
        if(!shelf || !shelf.length)
            return;
        console.log('add shelf', shelf);
        addShelf(shelf).then(shelves=>{
            this.setState({shelves,message:{status:'success', content:'New shelf successfully added'}});
            this.newShelf = '';
        }, (error)=>this.setState({message:{status:'error', content:error}}));
    }

    removeShelf(shelf) {
        removeShelf(shelf).then(shelves=>{
            console.log('removeShelf', shelves);
            this.setState({shelves,message:{status:'success', content:shelf + ' successfully removed'}});
        }, (error)=>this.setState({message:{status:'error', content:error}}));
    }

    render() {
        return <div className={'shelves'}>
            <h1>
                Shelves
            </h1>
            {
                this.state.shelves.map(shelf=><div key={shelf} className={'shelf'}>
                    <Link to={'/shelf/'+shelf}>{shelf}</Link>
                    <i onClick={()=>this.removeShelf(shelf)}>x</i>
                </div>)
            }
            <div className={'shelf add'}>
                <input onChange={(e)=>this.newShelf = e.target.value} type="text"/>
                <i onClick={this.addShelf.bind(this)}>+</i>
            </div>
        </div>;
    }

}
