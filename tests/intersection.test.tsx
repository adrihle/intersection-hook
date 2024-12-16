import { screen, render, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { TestContainer } from '../examples/basic';
import { act } from 'react';
import '@testing-library/jest-dom';

type Entry = { target: any; isIntersecting: boolean; };
type Trigger = (entries: Entry[]) => void;

class MockIntersectionObserver {
  static instances: any[] = [];
  options: any;
  unobserve: jest.Mock<any, any, any>;
  disconnect: jest.Mock<any, any, any>;
  observe: jest.Mock<any, any, any>;
  callback: jest.Mock<any, any, any>;
  trigger: Trigger;

  constructor(callback: any, options: any) {
    this.callback = callback;
    this.options = options;
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
    MockIntersectionObserver.instances.push(this);
    this.trigger = function (entries: { target: any, isIntersecting: boolean }[]) {
      this.callback(entries, this);
    }
  }
}

describe('Intersection hook implementation', () => {
  beforeEach(() => {
    global.IntersectionObserver = MockIntersectionObserver as any;
    render(<TestContainer />);
  });

  it('Should change to active menu item color when content-section2 is in screen', async () => {
    const observer = MockIntersectionObserver.instances[0];
    act(() => {
      observer.trigger([
        { target: screen.getByTestId(`content-section2`), isIntersecting: true },
      ]);
    });
    await waitFor(() => {
      expect(screen.getByTestId(`menu-section2`)).toHaveStyle({ color: 'red' });
    })
  });

  it('Should scroll to content-section3 when menu-section3 item is clicked', () => {
    const section = screen.getByTestId(`content-section3`);
    waitFor(() => {
      const menu = screen.getByTestId(`menu-section3`);
      userEvent.click(menu);
      section.scrollIntoView = jest.fn();
      expect(section.scrollIntoView).toHaveBeenCalled();
    })
  });
});
