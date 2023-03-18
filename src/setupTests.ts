// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { testServer } from './mocks/testServer';
import './i18n';

beforeAll(() => {
  testServer.listen({
    onUnhandledRequest: 'error',
  });
});

// this will remove any handler that has been added after calling setupServer
// for some specific test, so that this test specific handler is not present
// for the rest of the tests. This is important for test isolation.

// eslint-disable-next-line no-undef
afterEach(() => {
  testServer.resetHandlers();
});

// eslint-disable-next-line no-undef
afterAll(() => testServer.close());
