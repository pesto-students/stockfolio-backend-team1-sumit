import React, {Component} from 'react';
import News from './Components/news';
import NewsBar from './NewsBar';
    
class App extends Component {
    render() {
        return (
            <>
            <NewsBar />
            <News news={this.state.news} />
            </>
        )
    }
    
    state = {
        news: []
    };
 
    componentDidMount() {
        fetch("http://localhost:4060/posts")
            .then(res => res.json())
            .then((res) => {
                this.setState({ news: res[0].data })
            })
            .catch(console.log)
    }
}
 
export default App;