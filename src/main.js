import './css/style.css';


const notesData = [
  {
    id: 'notes-jT-jjsyz61J8XKiI',
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
    createdAt: '2022-07-28T10:03:12.594Z',
    archived: false,
  },
  {
    id: 'notes-aB-cdefg12345',
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
    createdAt: '2022-08-05T15:30:00.000Z',
    archived: false,
  },
  {
    id: 'notes-XyZ-789012345',
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
    createdAt: '2022-08-10T08:45:23.120Z',
    archived: false,
  },
  {
    id: 'notes-1a-2b3c4d5e6f',
    title: 'Personal Goals',
    body: 'Read two books per month, exercise three times a week, learn a new language.',
    createdAt: '2022-08-15T18:12:55.789Z',
    archived: false,
  },
  {
    id: 'notes-LMN-456789',
    title: 'Recipe: Spaghetti Bolognese',
    body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
    createdAt: '2022-08-20T12:30:40.200Z',
    archived: false,
  },
  {
    id: 'notes-QwErTyUiOp',
    title: 'Workout Routine',
    body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
    createdAt: '2022-08-25T09:15:17.890Z',
    archived: false,
  },
  {
    id: 'notes-abcdef-987654',
    title: 'Book Recommendations',
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: '2022-09-01T14:20:05.321Z',
    archived: false,
  },
  {
    id: 'notes-zyxwv-54321',
    title: 'Daily Reflections',
    body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
    createdAt: '2022-09-07T20:40:30.150Z',
    archived: false,
  },
  {
    id: 'notes-poiuyt-987654',
    title: 'Travel Bucket List',
    body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
    createdAt: '2022-09-15T11:55:44.678Z',
    archived: false,
  },
  {
    id: 'notes-asdfgh-123456',
    title: 'Coding Projects',
    body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
    createdAt: '2022-09-20T17:10:12.987Z',
    archived: false,
  },
  {
    id: 'notes-5678-abcd-efgh',
    title: 'Project Deadline',
    body: 'Complete project tasks by the deadline on October 1st.',
    createdAt: '2022-09-28T14:00:00.000Z',
    archived: false,
  },
  {
    id: 'notes-9876-wxyz-1234',
    title: 'Health Checkup',
    body: 'Schedule a routine health checkup with the doctor.',
    createdAt: '2022-10-05T09:30:45.600Z',
    archived: false,
  },
  {
    id: 'notes-qwerty-8765-4321',
    title: 'Financial Goals',
    body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
    createdAt: '2022-10-12T12:15:30.890Z',
    archived: false,
  },
  {
    id: 'notes-98765-54321-12345',
    title: 'Holiday Plans',
    body: 'Research and plan for the upcoming holiday destination.',
    createdAt: '2022-10-20T16:45:00.000Z',
    archived: false,
  },
  {
    id: 'notes-1234-abcd-5678',
    title: 'Language Learning',
    body: 'Practice Spanish vocabulary for 30 minutes every day.',
    createdAt: '2022-10-28T08:00:20.120Z',
    archived: false,
  },
];

console.log(notesData);

class AddNoteForm extends HTMLElement {
  constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      this._style = document.createElement('style');
      this._style.textContent = `
          .add-note-form {
              display: grid;
              grid-template-columns: auto 1fr;
              grid-gap: 10px;
              margin-bottom: 20px;
          }

          .add-note-form label {
              font-weight: bold;
          }

          .add-note-button {
              padding: 10px 20px;
              background-color: #265073;
              color: #fff;
              border: none;
              cursor: pointer;
          }
      `;

      // Memasukkan elemen style ke dalam shadow DOM
      this.shadowRoot.appendChild(this._style);

      // Mendefinisikan template untuk menampilkan formulir catatan
      this.shadowRoot.innerHTML += `
          <div class="add-note-form">
              <label for="title">Title:</label>
              <input type="text" id="title" name="title">
              <label for="body">Body:</label>
              <textarea id="body" name="body"></textarea>
              <label for="createdAt">Created At:</label>
              <input type="datetime-local" id="createdAt" name="createdAt">
              <button class="add-note-button">Add Note</button>
          </div>
      `;

      // Menambahkan event listener untuk tombol "Add Note"
      this.shadowRoot.querySelector('.add-note-button').addEventListener('click', async () => {
        // Show loading indicator
        loadingIndicator.show();
    
        const title = this.shadowRoot.getElementById('title').value.trim();
        const body = this.shadowRoot.getElementById('body').value.trim();
        const createdAt = this.shadowRoot.getElementById('createdAt').value.trim();
    
        // Validate input
        if (!title || !body || !createdAt) {
            alert('Please fill in all required fields.');
            // Hide loading indicator
            loadingIndicator.hide();
            return;
        }
    
        try {
            const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body })
            });
    
            if (!response.ok) {
                throw new Error('Failed to add note');
            }
    
            const data = await response.json();
    
            // Update UI or trigger event for updating UI
            const event = new CustomEvent('addnote', {
                bubbles: true,
                composed: true,
                detail: data.data
            });
            this.dispatchEvent(event);
    
            // Clear input fields
            this.shadowRoot.getElementById('title').value = '';
            this.shadowRoot.getElementById('body').value = '';
            this.shadowRoot.getElementById('createdAt').value = '';
    
        } catch (error) {
            console.error('Error adding note:', error);
            alert('Failed to add note. Please try again later.');
        } finally {
            // Hide loading indicator regardless of success or failure
            loadingIndicator.hide();
        }
    
    

          // Memanggil renderNotes di app-notes-container
          const notesContainer = document.querySelector('app-notes-container');
          if (notesContainer) {
              notesContainer.renderNotes(notesData);
          }
      });
  }
}

customElements.define('add-note-form', AddNoteForm);




class AppHeader extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    // Menambahkan gaya CSS
    this._style = document.createElement('style');
    this._style.textContent = `
      header {
        margin-bottom: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-color: #97E7E1;
      }

      .nav-items {
        margin: auto 0;
      }

      .menu {
        display: flex;
        column-gap: 100px;
        justify-content: end;
        margin: auto;
        margin-right: 20px;
      }

      header .nav-items .menu li {
        list-style-type: none;
        cursor: pointer;
      }

      header .logo {
        margin-left: 20px;
      }
    `;

    // Menambahkan elemen style ke dalam shadow DOM
    this.shadowRoot.appendChild(this._style);

    // Menambahkan elemen HTML ke dalam shadow DOM
    this.shadowRoot.innerHTML += `
      <header>
          <div class="logo">
              <h2>Noted Apps</h2>
          </div>
          <div class="nav-items">
              <ul class="menu">
                  <li>Catatanku</li>
              </ul>
          </div>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);



class NotesList extends HTMLElement {
  constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this._style = document.createElement('style');

      // Calling the _updateStyle method to initialize styles
      this._updateStyle();

      // Adding style element to shadow DOM
      this.shadowRoot.appendChild(this._style);

      // Creating a div element for the notes list
      const notesListContainer = document.createElement('div');
      notesListContainer.classList.add('notes-list');

      // Adding the notes list element to shadow DOM
      this.shadowRoot.appendChild(notesListContainer);
  }

  _updateStyle() {
      this._style.textContent = `
          .notes-list {
              display: grid;
              grid-template-columns: 1fr 1fr;
          } 
          
          @media screen and (max-width: 600px) {
              .notes-list {
                  grid-template-columns: 1fr;
              }
          }
      `;
  }

  // Method to render the notes list
  async renderNotes() {
    try {
        const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }

        const data = await response.json(); // Here is the data variable

        const notesListContainer = this.shadowRoot.querySelector('.notes-list');
        notesListContainer.innerHTML = '';

        data.data.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');

            const titleElement = document.createElement('h2');
            titleElement.textContent = note.title;

            const bodyElement = document.createElement('p');
            bodyElement.textContent = note.body;

            const createdAtElement = document.createElement('p');
            createdAtElement.textContent = `Created At: ${new Date(note.createdAt).toLocaleString()}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click event from bubbling to the note element
                this.deleteNote(note.id);
            });

            noteElement.appendChild(titleElement);
            noteElement.appendChild(bodyElement);
            noteElement.appendChild(createdAtElement);
            noteElement.appendChild(deleteButton);

            notesListContainer.appendChild(noteElement);
        });
    } catch (error) {
        console.error('Error fetching notes:', error);
        alert('Failed to fetch notes. Please try again later.');
    }
}


  // Lifecycle method called when the custom element is connected to the DOM
  connectedCallback() {
      // Rendering the displayed notes
      this.renderNotes();
  }
  // Method to delete a note
  async deleteNote(noteId) {
    // Show loading indicator
    loadingIndicator.show();

    try {
        const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete note');
        }

        // Refresh the notes list after deletion
        this.renderNotes();

    } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note. Please try again later.');
    } finally {
        // Hide loading indicator regardless of success or failure
        loadingIndicator.hide();
    }
}

}

customElements.define('app-notes-container', NotesList);


class LoadingIndicator extends HTMLElement {
  constructor() {
      super();

      // Create shadow DOM
      this.attachShadow({ mode: 'open' });

      // Create and append the style element
      const style = document.createElement('style');
      style.textContent = `
          .loading-container {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(255, 255, 255, 0.8);
              z-index: 9999;
              justify-content: center;
              align-items: center;
          }
          .loading-text {
              font-size: 24px;
              color: #333;
          }
      `;
      this.shadowRoot.appendChild(style);

      // Create and append the loading indicator
      const loadingContainer = document.createElement('div');
      loadingContainer.classList.add('loading-container');
      const loadingText = document.createElement('p');
      loadingText.classList.add('loading-text');
      loadingText.textContent = 'Loading...';
      loadingContainer.appendChild(loadingText);
      this.shadowRoot.appendChild(loadingContainer);
  }

  // Show the loading indicator
  show() {
      this.shadowRoot.querySelector('.loading-container').style.display = 'flex';
  }

  // Hide the loading indicator
  hide() {
      this.shadowRoot.querySelector('.loading-container').style.display = 'none';
  }
}

// Define the custom element
customElements.define('loading-indicator', LoadingIndicator);


 // Get a reference to the loading indicator
 const loadingIndicator = document.querySelector('loading-indicator');

 // Simulate a loading process (for demonstration purposes)
 function simulateLoading() {
     // Show the loading indicator
     loadingIndicator.show();

     // Simulate an asynchronous task
     setTimeout(() => {
         // Hide the loading indicator after the task is complete
         loadingIndicator.hide();
     }, 2000); // Simulate 2 seconds loading time
 }

 // Call the function to simulate loading
 simulateLoading();
