import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// import ListingForm from './components/ListingForm';

function App() {
  const [listOfListings, setListOfListings] = useState([]);
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [property_type, setProperty_type] = useState('');
  const [market, setMarket] = useState('');
  const [country, setCountry] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get('http://localhost:3001/getListings').then((response) => {
      setListOfListings(response.data);
    });
  };

  const createListing = () => {
    axios
      .post('http://localhost:3001/createListing', {
        name,
        summary,
        property_type,
        address: { market, country },
        bedrooms,
        bathrooms,
        price,
      })
      .then((response) => {
        setListOfListings([
          ...listOfListings,
          {
            name,
            summary,
            property_type,
            market,
            country,
            bedrooms,
            bathrooms,
            price,
          },
        ]);
      });
    clear();
  };

  const deleteListing = (id) => {
    // console.log('new id past in delet function: ', id);
    // const listing = [...listOfListings].filter(
    //   (listing) => listing.new_id != id
    // );
    setListOfListings((listings) => {
      [...listOfListings].filter((listing) => listing.new_id !== listing.id);
    });
    // console.log('ID IS: ', id);
    // const result = axios
    //   .get(`http://localhost:3001/listings/${id}`)
    //   .then((response) => {
    //     return response.data;
    //   });
    // console.log('RESULT VARIABLE', result);
    // axios.delete(`https://localhost/3001/listings/${id}`).catch((error) => {
    //   console.error('There was an error!', error);
    // });
    // await axios
    //   .delete(`https://localhost/3001/listings/${new_id}`)
    //   .catch((error) => {
    //     console.log('error: ', error);
    //   });
    // await axios
    //   .delete(`https://localhost/3001/listings/${new_id}`)
    //   .catch((err) => console.log(err));
    // const posts = this.state.posts.filter(item => item.id !== id);
    // this.setState({ posts });
    return console.log(id);
  };

  const editListing = (id) => {
    // const editedUser = [...listOfUsers].filter((user) => user._id != id);
    // console.log('EDIT USER');
    // console.log('id is: ', id);
  };

  const clear = () => {
    setName('');
    setSummary('');
    setProperty_type('');
    setMarket('');
    setCountry('');
    setBedrooms('');
    setBathrooms('');
    setPrice('');
  };

  return (
    <div className='App'>
      <form className='AddListingForm'>
        <input
          type='text'
          placeholder='Listing Name'
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <input
          type='text'
          placeholder='Summary'
          onChange={(event) => {
            setSummary(event.target.value);
          }}
        ></input>
        <input
          type='text'
          placeholder='Property Type'
          onChange={(event) => {
            setProperty_type(event.target.value);
          }}
        ></input>
        <input
          type='text'
          placeholder='City'
          onChange={(event) => {
            setMarket(event.target.value);
          }}
        ></input>
        <input
          type='text'
          placeholder='Country'
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        ></input>
        <input
          type='number'
          placeholder='Bedrooms'
          onChange={(event) => {
            setBedrooms(event.target.value);
          }}
        ></input>
        <input
          type='number'
          placeholder='Bathrooms'
          onChange={(event) => {
            setBathrooms(event.target.value);
          }}
        ></input>
        <input
          type='number'
          placeholder='Price'
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        ></input>

        <button onClick={createListing}> Add Listing </button>
      </form>
      <div className='ListingsDisplay'>
        {listOfListings.slice(-5).map((listing) => {
          return (
            <div key={listing._id} id={listing.new_id} value={listing.new_id}>
              <h1>Listing: {listing.name}</h1>

              <h2>Summary: {listing.summary}</h2>

              <h2>
                City: {listing.address.market}, Country:{' '}
                {listing.address.country}
              </h2>
              <h2>
                Property Type: {listing.property_type} Bedrooms:{' '}
                {listing.bedrooms}, Bathrooms: {listing.bathrooms}, Price:{' '}
                {listing.price}
              </h2>
              <h3>
                Old ID:{listing._id} New ID: {listing.new_id}
              </h3>
              <button onClick={() => editListing(listing._id)}>Edit</button>
              <button onClick={() => deleteListing(listing.new_id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
