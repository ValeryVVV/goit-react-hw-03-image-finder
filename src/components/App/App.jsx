import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../Button/Button";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import Searchbar from "../Searchbar/Searchbar";

import style from "./App.module.css";

export default class App extends Component {
    state = {
        URL: 'https://pixabay.com/api/',
        API_KEY: '32950349-b423a796dfbedf40b18320507',
        pictures: [],
        error: '',
        status: 'idle',
        page: 1,
        query: '',
        totalHits: null,
      }

      fetchImg = () => {
        return fetch(
          `${this.state.URL}?q=${this.state.query}&page=${this.state.page}&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(new Error('Failed to find any images'));
          })
          .then(pictures => {
            if (!pictures.total) {
              toast.error('Did find anything, mate');
            }
            const selectedProperties = pictures.hits.map(
              ({ id, largeImageURL, webformatURL }) => {
                return { id, largeImageURL, webformatURL };
              }
            );
            this.setState(prevState => {
              return {
                pictures: [...prevState.pictures, ...selectedProperties],
                status: 'resolved',
                totalHits: pictures.total,
              };
            });
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      };
    
      componentDidUpdate(prevProps, prevState) {
        const prevImg = this.state.query;
        const nextImg = prevState.query;

        if (prevImg !== nextImg) {
          this.setState({ status: 'pending', pictures: [], page: 1 });
          this.fetchImg();
        }
        if (
            prevImg === nextImg &&
          this.state.page !== prevState.page
        ) {
          this.setState({ status: 'pending' });
          this.fetchImg();
        }
      }

    handleFormSubmit = query => {
        this.setState({ query });
    }

    loadMore = () => {
        this.setState((prevState) => ({
          page: prevState.page + 1
        }));
      };


  render () {
    const { pictures, totalHits, status } = this.state;
    return( 
        <div className={style.app}>
            <Searchbar onSubmit={this.handleFormSubmit} />
            <ImageGallery images={pictures} />
            {totalHits > pictures.length &&  <Button onClick={this.loadMore} /> }
            {status === 'pending' && <Loader />}
            <ToastContainer position="top-right" autoClose={3000} />

        </div>

    )
  }
};
