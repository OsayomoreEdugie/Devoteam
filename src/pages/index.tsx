import React, {useEffect, useState} from "react";
import UserCard from "../components/UserCard";
import {NextPage} from "next";
import Image from 'next/image'
import {IUser} from "../interfaces/IUser";

const Home: NextPage = () => {

  const [isThumbnailView, setIsThumbnailView] = useState(true);
  const [users, setUsers] = useState<IUser[]>([] );

  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  // A function to toggle between the Thumbnail and list view
  const toggleView = () => {
    setIsThumbnailView(!isThumbnailView);
  }

  function request<TResponse>(
    url: string,
    // `RequestInit` is a type for configuring
    // a `fetch` request. By default, an empty object.
    config: RequestInit = {}

    // This function is async, it will return a Promise:
  ): Promise<TResponse> {

    // Inside, we call the `fetch` function with
    // a URL and config given:
    return fetch(url, config)
      // When got a response call a `json` method on it
      .then((response) => response.json())
      // and return the result data.
      .then((data) => data as TResponse)

    // We also can use some post-response
    // data-transformations in the last `then` clause.
  }

  // Here we're using the useEffect to fetch the users
  useEffect(() => {
    request<{results: IUser[]}>('https://randomuser.me/api/?results=50')
      .then((data) => {
        console.log(data)
        setUsers(data.results);
        setFilteredUsers(data.results);
      })
      .catch(err => {
        console.log('Error while fetching data', err)
      })
  }, [])

  // A function to sort users alphabetically
  const sortUsers = () => {
    const sortedUsers = users?.sort((a, b) => a.name.first.localeCompare(b.name.first))
    console.log(sortedUsers, 'sorted users')
    return Array.from(sortedUsers);
  }

  // function that will be called when user click on search icon
  const sortClickHandler = () => {
    setFilteredUsers(() => sortUsers())
  }

  //  Function to handle search functionality
  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    const filteredUsers = users.map(user => user.name.first.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ? user : null).filter(val => !!val);
    console.log(filteredUsers)
    setFilteredUsers(Array.from(filteredUsers as IUser[]));
  }

  return (
    <main aria-label={'app root'} className="app">
      <section aria-label={'app container'} className={`container`}>
        <h1 aria-label={'Meet the team heading'} className={`main-heading`}>
          Meet the Team
        </h1>

        <section aria-label={'main content'} className={`main-content`}>

          {/*     Header    */}
          <nav aria-label={'Header'} className={`header`}>
            <section aria-label={'Header left section'} className={`header__left`}>

              <button aria-label={'sort button'} onClick={sortClickHandler} className={`sorting-btn-desktop`} data-testid="sortButtonLeft">
                <Image aria-label={'sort icon'} width={23} height={23} src={'/Sorting-icon.svg'} alt="Sorting Icon"/>
              </button>

              <div className={`input-container`}>
                <input aria-label={'search input'} placeholder={`Search...`} onChange={inputChangeHandler} className={'search-input'} type="text"/>
                <button aria-label={'search icon'} className={'search-icon'} data-testid="searchButton">
                  <Image width={16} height={16} src={'/Search-icon.svg'} alt="Search Icon"/>
                </button>
              </div>

            </section>

            <section aria-label={'header right section'} className={`header__right`}>
              <button aria-label={'sort button'} onClick={sortClickHandler} className={`sorting-btn-mobile`}>
                <Image aria-label={'sort icon'} width={23} height={23} src={'/Sorting-icon.svg'} alt="Sorting Icon"/>
              </button>
              <button aria-label={'toggle view button'} onClick={toggleView} data-testid="viewToggleBtn">
                {
                  isThumbnailView ? (
                    <Image aria-label={'Thumbnail view icon'} priority={true} width={23} height={24} src={'/Thumbnail-view-icon.svg'} alt="Thumbnail View Icon"/>
                  ) : (
                    <Image aria-label={'List view icon'} priority={true} width={20} height={21} src={'/Card-view icons.svg'} alt="List View Icon"/>
                  )
                }
              </button>
            </section>
          </nav>

          {/*     Actual Content - Cards View or List View  */}
          <section aria-label={'user cards'} className={`cards-view ${isThumbnailView ? `cards-view-thumbnail` : `cards-view-list`}`}>
            {
              filteredUsers && filteredUsers.map((user, index) => (
                <UserCard
                  colorIndex={index + 1}
                  key={`${user.phone}${index}`}
                  name={user.name}
                  location={user.location}
                  picture={user.picture}
                  phone={user.phone}
                  email={user.email}
                  isThumbnailView={isThumbnailView}
                />
              ))
            }
          </section>

        </section>

      </section>
    </main>
  )
}

export default Home;
