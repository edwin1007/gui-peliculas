import React from "react";

import Card from '../components/Card/Card'

//const List = () => <Card/> 
class List extends React.Component{

    constructor(){
        super();
        this.state = {
            data: []
        }
    }
    
    async componentDidMount(){
        const res = await fetch('/data.json') 
        const resJSON = await res.json()
        //console.log(resJSON)
        this.setState({data: resJSON})
    }

    render(){
        return this.state.data.map(movie => {
            return <div>
                <h1>{movie.Title}</h1>
            </div>
        })
    }
}

export default List;