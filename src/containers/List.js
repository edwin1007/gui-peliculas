import React, {Fragment} from "react";

import Card from '../components/Card/Card'

//const List = () => <Card/> 

const API ='http://www.omdbapi.com/?i=tt3896198&apikey=40678bfd';

class List extends React.Component{

    constructor(){
        super();
        this.state = {
            data: [],
            searchTerm: '',
            error: ''
        }
    }
    
    async componentDidMount(){
        //const res = await fetch('/data.json') 
        const res = await fetch(`${API}&s=batman`)
        const resJSON = await res.json()
        //console.log(resJSON)
        this.setState({data: resJSON.Search})
    }

    async handleSubmit(e){
        e.preventDefault();
        //console.log('enviando...')
        if(!this.state.searchTerm){ 
            return this.setState({error: 'Please write a valid text'})
        }

        const res = await fetch(`${API}&s=${this.state.searchTerm}`)
        const data = await res.json();
        //console.log(data);

        if(!data.Search){
            return this.setState({error: 'Sin resultados'})
        }

        this.setState({data: data.Search, error: '', searchTerm: ''})
    }

    render(){
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-4 offset-md-4 p-4">
                        <form onSubmit={ (e) => this.handleSubmit(e)}>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search"
                                onChange={e => this.setState({searchTerm: e.target.value})}
                                value={this.state.searchTerm}
                                autoFocus
                                />
                        </form>
                        <p className="text-white">
                            {this.state.error ? this.state.error : ''}
                        </p>
                    </div>
                </div>
                <div className="row">
                    {
                        this.state.data.map((movie, i) => {
                            return <Card movie={movie} key={i}/> //error de indexar arreglo de img
                        })
                    }
                </div>
            </Fragment>
        )
    }
}

export default List;