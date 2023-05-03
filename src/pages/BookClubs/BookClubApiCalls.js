export async function newClub (user, body, setError) {
    // e.preventDefault()
    
    console.log('called')

    const uri = '/api/bookclubs/newClub'

	// const body = {prop1, prop2, prop3}

	const response = await fetch(process.env.REACT_APP_API + uri, {
		method: 'POST', // PUT or PATCH (or DELETE)
		body: JSON.stringify(body),
		headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
		}
	})

	const json = await response.json()

	if (!response.ok) setError(json.error)	

	if (response.ok) {
        return(json)
	  // dispatch({type: "SET_BOOKS", payload: json})
		// maybe reset form
	}
}

export async function modClub (user, currTitle, newTitle) {
    const info = {currTitle, newTitle}

    console.log('get club settings called')

    const uri = '/api/bookclubs/updateSettings'

    // const body = {prop1, prop2, prop3}

    const response = await fetch(process.env.REACT_APP_API + uri, {
        method: 'POST', // PUT or PATCH (or DELETE)
        body: JSON.stringify(info),
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    // if (!response.ok) setError(json.error)	

    if (response.ok) {
        console.log(json)
        return(json)
        // dispatch({type: "SET_BOOKS", payload: json})
        // maybe reset form
    }
}

export async function removeMember (user, member, club) {
    const info = {member, club}

    console.log(info.member)

    console.log('remove club member called')

    const uri = '/api/bookclubs/removeMember'

    // const body = {prop1, prop2, prop3}

    const response = await fetch(process.env.REACT_APP_API + uri, {
        method: 'POST', // PUT or PATCH (or DELETE)
        body: JSON.stringify(info),
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    // if (!response.ok) setError(json.error)	

    if (response.ok) {
        console.log(json)
        return(json)
        // dispatch({type: "SET_BOOKS", payload: json})
        // maybe reset form
    }
}

export async function newClubMember (user, club, newMember, setResponse) {
    const info = {club, newMember}
    
    console.log('called')

    const uri = '/api/bookclubs/newMember'

    // const body = {prop1, prop2, prop3}

    const response = await fetch(process.env.REACT_APP_API + uri, {
        method: 'POST', // PUT or PATCH (or DELETE)
        body: JSON.stringify(info),
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    // if (!response.ok) setError(json.error)	

    if (!response.ok) {
        setResponse(json)
        return(json)
    }
    if (response.ok) {
        setResponse('ok')
        console.log(json)
        return(json)
        // dispatch({type: "SET_BOOKS", payload: json})
        // maybe reset form
    }
}

export async function newClubBook (user, id, title, author, published, publisher, club) {
    console.log(user, id, title, author)

    const info = {id, title, author, publisher, published, club}

    const uri = '/api/bookclubs/newBook'

	// const body = {prop1, prop2, prop3}

	const response = await fetch(process.env.REACT_APP_API + uri, {
		method: 'POST', // PUT or PATCH (or DELETE)
		body: JSON.stringify(info),
		headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
		}
	})

	const json = await response.json()

	// if (!response.ok) setError(json.error)	

	if (response.ok) {
        return(json)
	  // dispatch({type: "SET_BOOKS", payload: json})
		// maybe reset form
	}


}

export async function newClubDiscussion (user, club, book, discussionInfo) {
    const info = {user, club, book, 
        title: discussionInfo.title,
        post: discussionInfo.post,
    }

    console.log('called')

    const uri = '/api/bookclubs/newDiscussion'

	// const body = {prop1, prop2, prop3}

	const response = await fetch(process.env.REACT_APP_API + uri, {
		method: 'POST', // PUT or PATCH (or DELETE)
		body: JSON.stringify(info),
		headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
		}
	})

	const json = await response.json()

	// if (!response.ok) setError(json.error)	

	if (response.ok) {
        return(json)
	  // dispatch({type: "SET_BOOKS", payload: json})
		// maybe reset form
	}
}

export async function newClubPost (user, reply, id, remark) {
    if (reply == true){

        const info = {user, id, remark}
    
        console.log('called')
    
        const uri = '/api/bookclubs/newReply'
    
        // const body = {prop1, prop2, prop3}
    
        const response = await fetch(process.env.REACT_APP_API + uri, {
            method: 'POST', // PUT or PATCH (or DELETE)
            body: JSON.stringify(info),
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
            }
        })
    
        const json = await response.json()
    
        // if (!response.ok) setError(json.error)	
    
        if (response.ok) {
            return(json)
          // dispatch({type: "SET_BOOKS", payload: json})
            // maybe reset form
        }

    }else if (reply == false){

        const info = {user, id, remark}
    
        console.log('called')
    
        const uri = '/api/bookclubs/newPost'
    
        // const body = {prop1, prop2, prop3}
    
        const response = await fetch(process.env.REACT_APP_API + uri, {
            method: 'POST', // PUT or PATCH (or DELETE)
            body: JSON.stringify(info),
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
            }
        })
    
        const json = await response.json()
    
        // if (!response.ok) setError(json.error)	
    
        if (response.ok) {
            return(json)
          // dispatch({type: "SET_BOOKS", payload: json})
            // maybe reset form
        }

    }
}

export async function newClubLike (id, user) {
    const info = {id}
    
    console.log('called')

    const uri = '/api/bookclubs/like'

    // const body = {prop1, prop2, prop3}

    const response = await fetch(process.env.REACT_APP_API + uri, {
        method: 'POST', // PUT or PATCH (or DELETE)
        body: JSON.stringify(info),
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    // if (!response.ok) setError(json.error)	

    if (response.ok) {
        console.log(json)
        return(json)
        // dispatch({type: "SET_BOOKS", payload: json})
        // maybe reset form
    }
}

export async function newClubUnlike (id, user) {
    const info = {id}
    
    console.log('called')

    const uri = '/api/bookclubs/unlike'

    // const body = {prop1, prop2, prop3}

    const response = await fetch(process.env.REACT_APP_API + uri, {
        method: 'POST', // PUT or PATCH (or DELETE)
        body: JSON.stringify(info),
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    // if (!response.ok) setError(json.error)	

    if (response.ok) {
        console.log(json)
        return(json)
      // dispatch({type: "SET_BOOKS", payload: json})
        // maybe reset form
    }
}

export async function newView (id, user) {
    const info = {id}

    console.log('view called')

    const uri = '/api/bookclubs/view'

    // const body = {prop1, prop2, prop3}

    const response = await fetch(process.env.REACT_APP_API + uri, {
        method: 'POST', // PUT or PATCH (or DELETE)
        body: JSON.stringify(info),
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    // if (!response.ok) setError(json.error)	

    if (response.ok) {
        console.log(json)
        return(json)
        // dispatch({type: "SET_BOOKS", payload: json})
        // maybe reset form
    }
}




export async function getClubs (user, setError, setClubs) {
    const uri = '/api/bookclubs/myClubs'

    console.log('called')

    const response = await fetch(process.env.REACT_APP_API + uri, {
		method: 'GET', // PUT or PATCH (or DELETE)
		headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
		}
	})

	const json = await response.json()
	
	if (response.ok) {
	  // dispatch({type: "SET_BOOKS", payload: json})
      console.log(json.clubs)
      setClubs(json.clubs)
	}

    if (!response.ok) {
        console.log(json.error)
        setError(json.error)
    }
}

export async function getClubBooks (user, club, setClubBooks, setError) {
    const uri = '/api/bookclubs/clubBooks/'

    console.log('called')

    const response = await fetch(process.env.REACT_APP_API + uri + club, {
		method: 'GET', // PUT or PATCH (or DELETE)
		headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
		}
	})

	const json = await response.json()
	
	if (response.ok) {
        // dispatch({type: "SET_BOOKS", payload: json})
        console.log(json.books)
        setClubBooks(json.books)
	}

    if (!response.ok) {
        console.log(json.error)
        setError(json.error)
    }
}

export async function getClubDiscussions (user, club, book, setDiscussions) {

    const info = {user, club, book}

    console.log('called')

    const uri = '/api/bookclubs/getDiscussions'

	// const body = {prop1, prop2, prop3}

	const response = await fetch(process.env.REACT_APP_API + uri, {
		method: 'POST', // PUT or PATCH (or DELETE)
		body: JSON.stringify(info),
		headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
		}
	})

	const json = await response.json()

	// if (!response.ok) setError(json.error)	

	if (response.ok) {
        console.log(json)
        setDiscussions(json)
	  // dispatch({type: "SET_BOOKS", payload: json})
		// maybe reset form
	}
}

export async function getClubPosts (user, club, book, discussion, setPosts) {
    const info = {user, club, book, discussion}

    const uri = '/api/bookclubs/getPosts'

	// const body = {prop1, prop2, prop3}

	const response = await fetch(process.env.REACT_APP_API + uri, {
		method: 'POST', // PUT or PATCH (or DELETE)
		body: JSON.stringify(info),
		headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
		}
	})

	const json = await response.json()

	// if (!response.ok) setError(json.error)	

	if (response.ok) {
        console.log(json)
        setPosts(json)
	  // dispatch({type: "SET_BOOKS", payload: json})
		// maybe reset form
	}
	if (!response.ok) {
        console.log(json.error)
        // setPosts(json)
	  // dispatch({type: "SET_BOOKS", payload: json})
		// maybe reset form
	}
}

export async function getClubSettings (user, clubName, setInfo) {
    const info = {clubName}

    console.log('get club settings called')

    const uri = '/api/bookclubs/getSettings'

    // const body = {prop1, prop2, prop3}

    const response = await fetch(process.env.REACT_APP_API + uri, {
        method: 'POST', // PUT or PATCH (or DELETE)
        body: JSON.stringify(info),
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    // if (!response.ok) setError(json.error)	

    if (response.ok) {
        console.log(json)
        setInfo({
            title: json.title,
            members: json.members,
            currentBooks: json.books
        })
        return(json)
        // dispatch({type: "SET_BOOKS", payload: json})
        // maybe reset form
    }
}