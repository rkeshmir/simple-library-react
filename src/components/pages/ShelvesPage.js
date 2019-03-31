// IMPORT PACKAGE REFERENCES
import React from 'react';
import {Link} from 'react-router-dom';
import {fetchShelves, addShelf, removeShelf} from '../../services/BookService';

// COMPONENT

export default class ShelvesPage extends React.Component {
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
            // this.newShelf = '';
            document.getElementById('new-shelf').value = '';
            this.setState({shelves});
        }, ()=>console.error('error'));
    }

    removeShelf(shelf) {
        removeShelf(shelf).then(shelves=>{
            this.setState({shelves});
        });
    }

    render() {
        return <div className={'shelves'}>
            <h1>
                Shelves
            </h1>
            <ul className="list-group">
                {
                    this.state.shelves.map(shelf=><li key={shelf} className={'list-group-item d-flex justify-content-between align-items-center shelf'}>
                        <Link to={'shelf/'+shelf}>{shelf}</Link>
                        <span className={'fa fa-trash'} onClick={()=>this.removeShelf(shelf)}/>
                        {/*<span className="badge badge-primary badge-pill">14</span>*/}
                    </li>)
                }
                <li className={'list-group-item d-flex justify-content-between align-items-center shelf add'}>
                    <input id='new-shelf' onChange={(e)=>this.newShelf = e.target.value} type="text"/>
                    <i className={'fa fa-plus'} onClick={this.addShelf.bind(this)}/>
                </li>
            </ul>

        </div>;
    }

}
