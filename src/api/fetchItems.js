import axios from 'axios';

const fetchItems = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?userId=2');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export{fetchItems} ;
