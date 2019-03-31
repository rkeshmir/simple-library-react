// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import XMLParser from 'react-xml-parser';

import {addBook, fetchBooks, searchBook} from '../../services/BookService';
import {addMessage} from '../state/actions/MessageActions';
import {SUCCESS, ERROR} from '../shared/Constants';

// COMPONENT
class ShelfPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            books: [],
            foundBooks: []
        };
        this.removeBook = this.removeBook.bind(this);
    }

    componentDidMount() {
        fetchBooks(this.props.match.params.title).then(books=>this.setState({books}));
    }

    componentDidUpdate() {
        console.log('componentDidUpdate', this.state.books);
    }

    addBook(book) {
        const shelf = this.props.match.params.title;
        if(!shelf || !shelf.length || !book)
            return;
        console.log('adding book to ' + shelf, book);
        addBook(shelf, book).then(books=>{
            this.setState({books});
            this.props.addMessage('New book successfully added to ' + shelf, SUCCESS);
        }, (error)=>this.props.addMessage(error, ERROR));
    }

    removeBook(shelf) {
        console.log('removeBook', shelf);
        //TODO: implement remove book after is it is implemented in bookService
    }

    searchBook(e) {
        e.preventDefault();
        console.log('searchBook', this.searchPhrase);
        if(!this.searchPhrase)
            return;
        searchBook(this.searchPhrase).then(response=>{
            response.text().then(data=>{
                const parsedData = new XMLParser().parseFromString(data);
                const foundBooks = parsedData.getElementsByTagName('work').map(work=>this.parseBook(work));
                console.log('foundBooks', foundBooks);
                this.setState({foundBooks});
            });
        }, (error)=>{
            console.log('errorBooks',error);
        });
    }

    getRating(book){
        const rating = Math.round(book.average_rating);
        const res = [];
        let i = 0;
        for(i;i < rating;i++)
            res.push(<span key={book.id+'_'+i} className="fa fa-star checked"/>);
        for(i;i<5;i++){
            res.push(<span key={book.id+'_'+i} className="fa fa-star"/>);
        }
        return res;
    }
    clearSearch(){
        this.setState({
            foundBooks: []
        });
        this.searchPhrase = '';
    }
    parseBook(book) {
        const result = {};
        book.children.forEach(child=>{
            if(child.name === 'best_book')
            {
                child.children.forEach(ch=>{
                    if(ch.name === 'author'){
                        result.author = ch.children[1].value;
                    }
                    else
                        result[ch.name] = ch.value;
                });
            }
            else
                result[child.name] = child.value;
        });
        return result;
    }
    getDate(book){
        const months = ['Jan', 'Feb', 'Marc', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'];
        if(!book.original_publication_day && !book.original_publication_month && !book.original_publication_year)
            return null;
        if(!book.original_publication_day && !book.original_publication_month)
            return book.original_publication_year;
        if(!book.original_publication_day)
            return months[parseInt(book.original_publication_month) - 1] + ', ' + book.original_publication_year;
        return book.original_publication_day + ' '  + months[parseInt(book.original_publication_month) - 1] + ', ' + book.original_publication_year;
    }

    render() {
        const title = this.props.match.params.title;
        return <div className={'shelf-page'}>
            <h1 className={'mb-5'}>
                <b>{title}</b> shelf
            </h1>
            {this.state.books.length < 1 && <div className={'alert alert-primary'}>
                {this.props.match.params.title} is empty!
            </div>}
            {this.state.books.length > 0 && <table className={'table'}>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publication Date</th>
                    <th>Action</th>
                </tr>
                {
                    this.state.books.map(book=> <tr key={book.id}>
                        <td>
                            <img src={book.small_image_url} alt="Image not found"/>
                        </td>
                        <td>{book.title}</td>
                        <td>
                            {book.author}
                        </td>
                        <td>{this.getDate(book) ? this.getDate(book) : 'Unknown'}</td>
                        <td >
                            <span className={'remove m-3'} title={'Remove from shelf'}>
                                <i className={'fa fa-trash mr-1'}/>
                            </span>
                        </td>
                    </tr>)
                }
            </table>}

            <div className={'search-books'}>
                <form className={'search-form'} onSubmit={this.searchBook.bind(this)}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search book ..."
                            aria-label="Recipient's username" aria-describedby="button-addon2"
                            name={'searchInput'} onChange={(e)=>this.searchPhrase = e.target.value}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
                                Search
                            </button>
                        </div>
                    </div>
                    <span className={'clear-search'} onClick={this.clearSearch.bind(this)}>
                        <i className={'fa fa-times mr-2'}/>
                        Clear Search
                    </span>
                </form>
                <div className={'found-books'}>
                    {
                        this.state.foundBooks.map(book=><div key={book.id} className={'found-book card'}>
                            <div className="left">
                                <img src={book.image_url} className="card-img-top" alt="Image not found"/>
                            </div>
                            <div className="right">
                                <h6>{book.title}</h6>
                                <div>
                                    Author: {book.author}
                                </div>
                                {this.getDate(book) && <div>
                                    Published on: {this.getDate(book)}
                                </div>}
                                <div className={'rating'}>
                                    {this.getRating(book)}
                                </div>
                                <div className={'action'}>
                                    <button type="button" className="btn btn-outline-primary"
                                            onClick={()=>this.addBook(book)}>
                                        Add to {title}
                                    </button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>;
    }
}


ShelfPage.propTypes = {
    match: PropTypes.object.isRequired,
    addMessage: PropTypes.func
};



const mapDispatchToProps = dispatch => {
    return {
        addMessage: (content, status)=>dispatch(addMessage(content, status))
    };
};
export default connect(null, mapDispatchToProps)(withRouter(ShelfPage));
