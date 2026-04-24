describe('Reservations E2E', () => {
  let jwt: string;

  beforeAll(async () => {
    const user = {
      email: 'yacineak97@gmail.com',
      password: 'Yacine1234!',
    };

    const query = `
      mutation {
        createUser(createUserInput: {
          email: ${JSON.stringify(user.email)},
          password: ${JSON.stringify(user.password)},
          roles: [{ name: "Admin" }]
        }) {
          id
          email
          roles {
            id
            name
          }
        }
      }
    `;

    await fetch('http://gateway:3006/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    jwt = await response.text();
  });

  const createReservation = async () => {
    const query = `
      mutation {
        createReservation(createReservationInput: {
          startDate: "2023-02-01",
          endDate: "2023-02-05",
          charge: {
            amount: 129,
            card: {
              cvc: "413",
              exp_month: 12,
              exp_year: 2027,
              number: "4242 4242 4242 4242"
            }
          }
        }) {
          id
          timestamp
          startDate
          endDate
          userId
          invoiceId
        }
      }
    `;

    const responseCreate = await fetch('http://gateway:3006/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authentication: jwt,
      },
      body: JSON.stringify({ query }),
    });

    const result = await responseCreate.json();

    expect(responseCreate.ok).toBeTruthy();
    expect(result.data.createReservation).toBeDefined();

    return result.data.createReservation;
  };

  test('Create & Get reservation flow', async () => {
    const createdReservation = await createReservation();

    const query = `
      query {
        reservation(id: ${createdReservation.id}) {
          id
          timestamp
          startDate
          endDate
          userId
          invoiceId
        }
      }
    `;

    const responseGet = await fetch('http://gateway:3006/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authentication: jwt,
      },
      body: JSON.stringify({ query }),
    });

    const result = await responseGet.json();

    const reservation = result.data.reservation;

    expect(createdReservation).toEqual(reservation);
  });
});
