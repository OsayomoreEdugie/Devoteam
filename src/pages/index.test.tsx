import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';

import Home from './index';

import '@testing-library/jest-dom/extend-expect'

const mockApiData = {
  "results": [
    {
      "gender": "female",
      "name": {
        "title": "Mr",
        "first": "John",
        "last": "Doe"
      },
      "location": {
        "street": {
          "number": 7531,
          "name": "Aleksanterinkatu"
        },
        "city": "Huittinen",
        "state": "Pirkanmaa",
        "country": "Finland",
        "postcode": 82096,
        "coordinates": {
          "latitude": "-23.9087",
          "longitude": "158.9300"
        },
        "timezone": {
          "offset": "-11:00",
          "description": "Midway Island, Samoa"
        }
      },
      "email": "iiris.hakola@example.com",
      "login": {
        "uuid": "5130c019-ca3f-4f4f-9c70-83942267d190",
        "username": "angryleopard306",
        "password": "hogan",
        "salt": "Qm79s9YW",
        "md5": "43bedbef734e374298e1738538988f77",
        "sha1": "a51461c6b845f6868d3c9a9577a30639084f8b28",
        "sha256": "66c42344777e97fb9d453899f5734f056e2a65b7bc8560b213dca6151137eb51"
      },
      "dob": {
        "date": "1979-03-03T19:34:22.862Z",
        "age": 43
      },
      "registered": {
        "date": "2008-03-21T09:56:26.872Z",
        "age": 14
      },
      "phone": "03-448-050",
      "cell": "041-672-81-98",
      "id": {
        "name": "HETU",
        "value": "NaNNA870undefined"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/15.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/15.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/15.jpg"
      },
      "nat": "FI"
    },
    {
      "gender": "female",
      "name": {
        "title": "Miss",
        "first": "Iiris",
        "last": "Hakola"
      },
      "location": {
        "street": {
          "number": 7531,
          "name": "Aleksanterinkatu"
        },
        "city": "Huittinen",
        "state": "Pirkanmaa",
        "country": "Finland",
        "postcode": 82096,
        "coordinates": {
          "latitude": "-23.9087",
          "longitude": "158.9300"
        },
        "timezone": {
          "offset": "-11:00",
          "description": "Midway Island, Samoa"
        }
      },
      "email": "iiris.hakola@example.com",
      "login": {
        "uuid": "5130c019-ca3f-4f4f-9c70-83942267d190",
        "username": "angryleopard306",
        "password": "hogan",
        "salt": "Qm79s9YW",
        "md5": "43bedbef734e374298e1738538988f77",
        "sha1": "a51461c6b845f6868d3c9a9577a30639084f8b28",
        "sha256": "66c42344777e97fb9d453899f5734f056e2a65b7bc8560b213dca6151137eb51"
      },
      "dob": {
        "date": "1979-03-03T19:34:22.862Z",
        "age": 43
      },
      "registered": {
        "date": "2008-03-21T09:56:26.872Z",
        "age": 14
      },
      "phone": "03-448-050",
      "cell": "041-672-81-98",
      "id": {
        "name": "HETU",
        "value": "NaNNA870undefined"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/15.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/15.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/15.jpg"
      },
      "nat": "FI"
    }
  ]
};

global.console.error = () => {};
global.console.log = () => {};
global.console.warn = () => {};

const mockFetch = (
  status = 200,
  returnBody: any
) => {
  global.fetch = jest.fn().mockImplementationOnce(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        status,
        json: () => {
          return returnBody ? returnBody : {};
        },
      });
    });
  });
};


 // Home Test

describe('Home', () => {
  const user = mockApiData.results[0];

  let container: any;

   // mock api and render the component 
  beforeEach(() => {
    mockFetch(200, mockApiData);

    const { container: componentContainer } = render(<Home />)
    container = componentContainer;
  });

  // Test Home Component 

  describe('Home Component', () => {
    test('shows the heading to the user', () => {
      const heading = screen.getByText('Meet the Team');

      expect(heading).toBeInTheDocument()
    })

    test('it sorts the users', () => {
      const sortButtonLeft = screen.getByTestId('sortButtonLeft');

      expect(sortButtonLeft).toBeInTheDocument()
    })

    test('allows user to type in search input', () => {
      const searchInput = screen.getByPlaceholderText('Search...');

      expect(searchInput).toBeInTheDocument()
    })

    test('allows user to search', () => {
      const searchButton = screen.getByTestId('searchButton');

      expect(searchButton).toBeInTheDocument()
    })

    test('allows user to toggle the view', () => {
      const viewToggleBtn = screen.getByTestId('viewToggleBtn');

      expect(viewToggleBtn).toBeInTheDocument()
    })
  })

   // Test User Card Component 
  describe('User Card Component', () => {
    test('shows the user profile picture on screen', async () => {
      const userProfileImage = await screen.findAllByTestId('userProfileImage');

      expect(userProfileImage).toHaveLength(2)
    })

    test('shows full image with details', async () => {
      const userName = await screen.findByText(user.name.first);

      expect(userName).toBeInTheDocument()

      const city = await screen.findAllByTestId('userCityFull');

      expect(city).toHaveLength(2)
      expect(city[0]).toHaveTextContent(user.location.city)
    })

    test('shows user social contact button', async () => {
      const emailTo = await screen.findAllByTestId('mailToUserBtn');
      expect(emailTo).toHaveLength(2)

      const userTelBtn = await screen.findAllByTestId('userTelBtn');
      expect(userTelBtn).toHaveLength(2)
    })

    test('allows user to sort the users', async () => {
      const sortButtonLeft = await screen.findByTestId('sortButtonLeft');
      fireEvent.click(sortButtonLeft)

      waitFor(() =>
        expect(container.querySelectorAll('.user__name')).toHaveTextContent('Iiris')
      )
    })

    test('allows user to switch to thumbnail view', async () => {
      const viewToggleBtn = await screen.findByTestId('viewToggleBtn');
      fireEvent.click(viewToggleBtn)

      waitFor(() =>
        expect(container.querySelectorAll('.card-thumbnail')).toHaveLength(1)
      )
    })
  })
})