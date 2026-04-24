import net from 'net';

describe('Health Checks', () => {
  describe('Gateway', () => {
    test('GraphQL endpoint', async () => {
      const response = await fetch('http://gateway:3006/graphql', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          query: `{ __typename }`,
        }),
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.data.__typename).toBeDefined();
    });
  });

  describe('HTTP Services', () => {
    test('Reservations service', async () => {
      const response = await fetch('http://reservations:3000');
      expect(response.ok).toBeTruthy();
    });

    test('Auth service', async () => {
      const response = await fetch('http://auth:3001');
      expect(response.ok).toBeTruthy();
    });
  });

  describe('TCP Services', () => {
    test('Payments service', async () => {
      await new Promise<void>((resolve, reject) => {
        const socket = net.createConnection(3003, 'payments');

        socket.on('connect', () => {
          socket.destroy();
          resolve();
        });

        socket.on('error', reject);
      });
    });

    test('Notifications service', () => {
      return new Promise((resolve, reject) => {
        const socket = net.createConnection(3004, 'notifications');

        socket.on('connect', () => {
          socket.destroy();
          resolve(true);
        });

        socket.on('error', reject);
      });
    });
  });
});
