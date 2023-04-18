import './App.css';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext } from './pages/Hooks/useAuthContext'
import { useLogout } from "./pages/Hooks/useLogout"
import { useBookNotesContext } from './pages/Hooks/useBookNotesContext'



//pages
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import MyNotes from './pages/Notes/MyNotes'
import BookNotes, { bookNotesLoader } from './pages/Notes/BookNotes'
import BookNotes2 from './pages/Notes/BookNotes2'
import Note from './pages/Notes/Note'
import NewNote from './pages/Notes/NewNote'
import EditNote from './pages/Notes/EditNote'
import SignIn from './pages/Account/SignIn'
import SignUp from './pages/Account/SignUp'
import Discussions from './pages/Discussions/Discussions'
import DiscussionGenre from './pages/Discussions/DiscussionGenre'
import DiscussionBook from './pages/Discussions/DiscussionBook'
import DiscussionTopic from './pages/Discussions/DiscussionTopic'
import MobileAccount from './pages/Account/mobileAccount';
import MyClubs from './pages/BookClubs/MyClubs';
import ModifyClub from './pages/BookClubs/ModifyClub';
import ClubBooks from './pages/BookClubs/ClubBooks';
import ClubBookDiscussions from './pages/BookClubs/ClubBookDiscussions';
import NewClubBook from './pages/BookClubs/NewClubBook';
import NewClubDiscussion from './pages/BookClubs/NewClubDiscussion';
import Discussion from './pages/BookClubs/Discussion';

//layouts
import RootLayout from './layouts/RootLayout'



function App() {
  
  //checks youre signed in
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const {books, dispatch} = useBookNotesContext()  

  useEffect(() => {
    // console.log(user)
    const fetchBooks = async () => {
      const response = await fetch(process.env.REACT_APP_API + '/api/notes/books', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      // console.log(json)

      if (json.error == 'Request is not authorized'){
        console.log('const { logout } = useLogout(), logging out')
        logout ()
      }
      
      if (response.ok) {
        dispatch({type: "SET_BOOKS", payload: json})
      }
    }

    
    if (user){
      // fetchBooks()
    }

  }, [user])
  
  // console.log(user)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* <div className="pages"> */}
        <Route index element={<Home />} />
        {/* <Route path="about" element={<About />} />
        <Route path="books" element={<Books />} loader={booksLoader}>
            <Route path=":id" element={<BookCategory />} loader={bookCatLoader}>
              <Route path=":id" element={<Book />} loader={bookLoader} />
            </Route>
          </Route>
        <Route path="notes" element={<MyNotes />} loader={notesLoader}>
            <Route path=":id" element={<BookNotes />} loader={bookNotesLoader}>
              <Route path=":id" element={<Note />} loader={noteLoader} />
            </Route>
          </Route>
          
          
          
          <Route path="account" element={<Account />} loader={settingsLoader} />
        <Route path="recover" element={<AccountRecovery />} /> */}
      
        <Route path="signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
        <Route path="signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="mobileAccount" element={<MobileAccount />} />
  
        <Route path="notes" element={user ? <MyNotes /> : <SignIn />} />

        <Route path="notes/:id" element={<BookNotes2 />}/>
        {/* <Route path="notes/:id" element={user ? <BookNotes2 /> : <Navigate to="/signin" />}/> */}
        <Route path="notes/:id/new" element={<NewNote />}/>
        <Route path="notes/:id/:noteId/edit" element={<EditNote />}/>
  
        <Route path="discuss" element={<Discussions />} /*loader={discussLoader}*/ />
        <Route path="discuss/:genre" element={<DiscussionGenre />} /*loader={discussLoader}*/ />
        <Route path="discuss/:genre/:book" element={<DiscussionBook />} /*loader={discussLoader}*/ />
        <Route path="discuss/:genre/:book/:topic" element={<DiscussionTopic />} /*loader={discussLoader}*/ />
       
        <Route path="bookclubs" element={<MyClubs />} /*loader={discussLoader}*/ />
        <Route path="bookclubs/:club" element={<ClubBooks />} /*loader={discussLoader}*/ />
        <Route path="bookclubs/:club/:book" element={<ClubBookDiscussions />} /*loader={discussLoader}*/ />
        <Route path="bookclubs/:club/modify" element={<ModifyClub />} /*loader={discussLoader}*/ />
        <Route path="bookclubs/new" element={<ModifyClub />} /*loader={discussLoader}*/ />
        <Route path="bookclubs/:club/newBook" element={<NewClubBook />} /*loader={discussLoader}*/ />
        <Route path="bookclubs/:club/:book/newDiscussion" element={<NewClubDiscussion />} /*loader={discussLoader}*/ />
        <Route path="bookclubs/:club/:book/:discussion" element={<Discussion />} /*loader={discussLoader}*/ />
        

        <Route path="*" element={<NotFound />} />
        {/* </div> */}
      </Route>
    )
  )

  return (
      <RouterProvider router={router} />
  );
}

export default App;
