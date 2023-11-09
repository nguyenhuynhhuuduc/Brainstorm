const axios = require('axios');

const books = [
  {
    nameBook: 'Beyond the Horizon',
    author: 'Alice Montgomery',
    isbn: '978-1-2345-6789-0',
    publisher: 'Horizon Publications',
    format: 'Paperback',
  },
  {
    nameBook: 'Echoes of Eternity',
    author: 'Daniel Williams',
    isbn: '978-0-9876-5432-1',
    publisher: 'Timeless Books',
    format: 'Hardcover',
  },
  ,
  {
    nameBook: 'Whispers in the Wind',
    author: 'Emily Turner',
    isbn: '978-3-2109-8765-4',
    publisher: 'Tranquil Press',
    format: 'eBook',
  },
  {
    nameBook: 'Enigma of Embers',
    author: 'Oliver Harris',
    isbn: '978-4-5678-1234-5',
    publisher: 'Mystic Publishing',
    format: 'Audio Book',
  },
  {
    nameBook: 'Luminary Legends',
    author: 'Sophia Miller',
    isbn: '978-5-4321-8765-0',
    publisher: 'Starlight Press',
    format: 'Hardcover',
  },
  {
    nameBook: 'Serenade in Shadows',
    author: 'Michael Davidson',
    isbn: '978-6-7890-1234-5',
    publisher: 'Moonlit Books',
    format: 'eBook',
  },
  {
    nameBook: 'Whirlwind Wonders',
    author: 'Isabel Anderson',
    isbn: '978-7-8901-2345-6',
    publisher: 'Gale Publications',
    format: 'Paperback',
  },
  {
    nameBook: 'Astral Alchemy',
    author: 'Victor Stone',
    isbn: '978-8-9012-3456-7',
    publisher: 'Celestial Books',
    format: 'Hardcover',
  },
];

async function DbInitialize() {
  for (const book of books) {
    try {
      const response = await axios.post('http://localhost:3000/api/books', book);
      console.log(`Book ${book?.nameBook} added successfully!`);
    } catch (error) {
      console.log(error);
    }
  }
}

DbInitialize();
